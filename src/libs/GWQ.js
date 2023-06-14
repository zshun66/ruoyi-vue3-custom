/**
 * 捷宇签名
 */
export default {
	/**
	 * 初始化
	 */
	init: function() {
		let OBJECT = document.querySelector('#GWQ')
		if (!OBJECT) {
			OBJECT = document.createElement('OBJECT')
			OBJECT.setAttribute('classid', 'clsid:96BB8ADA-D348-4414-8892-DC79C8818841')
			OBJECT.setAttribute('id', 'GWQ')
			OBJECT.setAttribute('width', 0)
			OBJECT.setAttribute('height', 0)
			OBJECT.style.position = 'fixed'
			OBJECT.style.zIndex = '-9'
			document.documentElement.appendChild(OBJECT)
		}
		const wss = new WebSocket('ws://localhost:1919')
		return wss
	},
	/**
	 * 浏览器名称
	 */
	browser: function() {
		var userAgent = navigator.userAgent
		if (userAgent.indexOf('Opera') > -1) {
			return 'Opera'
		} else if (userAgent.indexOf('Firefox') > -1) {
			return 'Firefox'
		} else if (userAgent.indexOf('Edge') > -1) {
			return 'Edge'
		} else if (userAgent.indexOf('Chrome') > -1) {
			return 'Chrome'
		} else if (userAgent.indexOf('Safari') > -1) {
			return 'Safari'
		} else {
			return 'IE'
		}
	},
	/**
	 * 操作状态文本
	 * @param {*} PDFPath
	 * @param {*} Location
	 * @param {*} Timeout
	 * @param {*} KeyWord
	 * @param {*} OffSet
	 * @returns
	 */
	statusCodeMessage: function(code) {
		let message = ''
		if (code == 0) {
			message = '操作成功'
		} else if (code == -1) {
			message = '参数错误'
		} else if (code == -2) {
			message = '操作超时'
		} else if (code == -3) {
			message = '设备连接错误'
		} else if (code == -4) {
			message = '发送数据失败'
		} else if (code == -5) {
			message = '读取数据失败'
		} else if (code == -6) {
			message = '文件操作失败'
		} else if (code == -7) {
			message = '设备处在操作状态，请取消后再试'
		} else if (code == -9) {
			message = '操作取消'
		} else {
			message = '操作失败，返回错误码为：' + code
		}
		return message
	},
	/**
	 * 关键字签名
	 * @param {String} PDFPath 凭证完整路径
	 * @param {String} Location 签名或指纹位置
	 * 		一个签名或指纹标准格式为 State,Page,X,Y
	 * 		State--------0 表示签名 1 表示指纹 2 表示既有签名又有指纹
	 * 		Page---------表示页码（保留，暂时不用）
	 *	 	X-------------坐标位置 （保留，暂时不用）
	 * 		Y-------------坐标位置（保留，暂时不用）
	 * 		例如：0,2,380,60
	 * @param {Number} PDFPath 超时时间
	 * @param {String} PDFPath 关键字
	 * @param {Number} PDFPath 偏移量
	 */
	DoGWQ_KeyWordSign: function(PDFPath, Location, Timeout, KeyWord, OffSet) {
		let ret = GWQ.DoGWQ_KeyWordSign(PDFPath, Location, Timeout, KeyWord, OffSet)
		return ret
	},
}
