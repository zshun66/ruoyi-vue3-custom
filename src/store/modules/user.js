import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defaultAvatar from '@/assets/images/profile.jpg'

const useUserStore = defineStore('user', {
	state: () => ({
		token: getToken(),
		userInfo: {},
		nickName: '',
		name: '',
		avatar: '',
		roles: [],
		permissions: []
	}),
	actions: {
		// 登录
		Login(form) {
			const username = form.username.trim()
			const password = form.password
			const code = form.code
			const uuid = form.uuid
			return new Promise((resolve, reject) => {
				login(username, password, code, uuid).then(res => {
					setToken(res.token)
					this.token = res.token
					resolve(true)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取用户信息
		GetInfo() {
			return new Promise((resolve, reject) => {
				getInfo().then(res => {
					const user = res.user
					const avatar = (user.avatar == '' || user.avatar == null) ? defaultAvatar : import.meta.env.VITE_APP_BASE_API + user.avatar
					if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
						this.roles = res.roles
						this.permissions = res.permissions
					} else {
						this.roles = ['ROLE_DEFAULT']
					}
					this.userInfo = user
					this.nickName = user.nickName
					this.name = user.userName
					this.avatar = avatar
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 退出系统
		LogOut() {
			return new Promise((resolve, reject) => {
				logout(this.token).then(() => {
					this.token = ''
					this.roles = []
					this.permissions = []
					removeToken()
					resolve(true)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
})

export default useUserStore
