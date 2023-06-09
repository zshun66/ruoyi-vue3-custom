import axios from 'axios'
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { getToken } from '@/utils/token'
import { tansParams, tansData, blobValidate } from '@/utils/ruoyi'
import cache from '@/plugins/modules/cache'
import { saveAs } from 'file-saver'
import useUserStore from '@/store/modules/user'

// 错误码
export let errorCode = {
	'401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误，请反馈给管理员'
}

// 是否显示重新登录
export let isRelogin = { show: false }

// 创建axios实例
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	timeout: 10000
})

// axios请求拦截器
service.interceptors.request.use(config => {
	// 是否需要设置token(默认需要)
  const isToken = config.headers.token === undefined ? true : config.headers.token
	// 是否清除空字符串字段(默认不需要)
	const isCleanEmpty = config.headers.cleanEmpty === undefined ? false : config.headers.cleanEmpty
	// 是否需要防止数据重复提交(默认需要)
  const isRepeatSubmit = config.headers.repeatSubmit === undefined ? true : config.headers.repeatSubmit

	if (isToken && getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
	if (config.method === 'get' && config.params) {
		let url = config.url + '?' + tansParams(config.params, isCleanEmpty)
		url = url.slice(0, -1)
		config.params = {}
		config.url = url
	}
	if (config.data) {
    config.data = tansData(config.data, isCleanEmpty)
  }
	// post、put请求防重复提交
	if (isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
		const requestObj = {
			url: config.url,
			data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
			time: new Date().getTime()
		}
		const sessionObj = cache.session.getJSON('sessionObj')
		if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
			cache.session.setJSON('sessionObj', requestObj)
		} else {
			const s_url = sessionObj.url                // 请求地址
			const s_data = sessionObj.data              // 请求数据
			const s_time = sessionObj.time              // 请求时间
			const interval = 1000                       // 间隔时间(ms)，小于此时间视为重复提交
			if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
				const message = '数据正在处理，请勿重复提交'
				return Promise.reject(new Error(message))
			} else {
				cache.session.setJSON('sessionObj', requestObj)
			}
		}
	}
	return config
}, error => {
	Promise.reject(error)
})

// axios响应拦截器
service.interceptors.response.use(res => {
	// 是否需要弹出错误信息(默认需要)
	const isAlertErrorMsg = res.config.headers.alertErrorMsg === undefined ? true : res.config.headers.alertErrorMsg

	// 未设置状态码则默认成功状态
	let code = res.data.code || 200
	// 获取错误信息
	const msg = errorCode[code] || res.data.msg || errorCode['default']

	// 二进制数据则直接返回
	if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
		return res.data
	}
	if (code === 401) {
		if (!isRelogin.show) {
			isRelogin.show = true
			ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				isRelogin.show = false
				useUserStore().LogOut().then(() => {
					location.href = '/login'
				})
			}).catch(() => {
				isRelogin.show = false
			})
		}
		if (isAlertErrorMsg) {
			ElMessage({ type: 'error', message: '无效的会话，或者会话已过期，请重新登录。', grouping: true })
			return undefined
		}
		return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
	} else if (code === 500) {
		if (isAlertErrorMsg) {
			ElMessage({ type: 'error', message: msg, grouping: true })
			return undefined
		}
		return Promise.reject(new Error(msg))
	} else if (code !== 200) {
		if (isAlertErrorMsg) {
			ElNotification({ type: 'error', title: '错误', message: msg })
			return undefined
		}
		return Promise.reject(new Error(msg))
	} else {
		return res.data
	}
}, error => {
		console.log('err' + error)
		let { message } = error
		if (message == 'Network Error') {
			message = '系统接口连接异常'
		} else if (message.includes('timeout')) {
			message = '系统接口请求超时'
		} else if (message.includes('Request failed with status code')) {
			message = '系统接口' + message.substr(message.length - 3) + '异常'
		}
		ElMessage({ message: message, type: 'error', duration: 5 * 1000, grouping: true })
		return Promise.reject(error)
	}
)

// 通用导出文件方法
export function exportFile(url, params, filename, config) {
	let downloadLoadingInstance = ElLoading.service({
		text: '正在下载数据，请稍候',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})
	return service.post(url, params, {
		transformRequest: [(params) => { return tansParams(params) }],
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		responseType: 'blob',
		...config
	}).then(async (data) => {
		const isBlob = blobValidate(data)
		if (isBlob) {
			const blob = new Blob([data])
			saveAs(blob, filename)
		} else {
			const resText = await data.text()
			const rspObj = JSON.parse(resText)
			const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
			ElMessage.error(errMsg)
		}
		downloadLoadingInstance.close()
	}).catch((r) => {
		ElMessage.error('下载文件出现错误，请联系管理员！')
		downloadLoadingInstance.close()
	})
}

export default service
