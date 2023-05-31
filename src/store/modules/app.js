import Cookies from 'js-cookie'

const useAppStore = defineStore('app', {
	state: () => ({
		sidebar: {
			// 侧边栏是否打开状态
			opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
			// 侧边栏是否隐藏
			hide: false,
			// 侧边栏是否需要动画
			withoutAnimation: false,
		},
		// 设备类型
		device: 'desktop',
		// 组件大小
		size: Cookies.get('size') || 'default'
	}),
	actions: {
		// 侧边栏打开/收缩状态切换
		toggleSideBar(withoutAnimation) {
			if (this.sidebar.hide) {
				return false
			}
			this.sidebar.opened = !this.sidebar.opened
			this.sidebar.withoutAnimation = withoutAnimation
			if (this.sidebar.opened) {
				Cookies.set('sidebarStatus', 1)
			} else {
				Cookies.set('sidebarStatus', 0)
			}
		},
		// 打开侧边栏
		openSideBar({ withoutAnimation }) {
			Cookies.set('sidebarStatus', 1)
			this.sidebar.opened = true
			this.sidebar.withoutAnimation = withoutAnimation
		},
		// 收缩侧边栏
		closeSideBar({ withoutAnimation }) {
			Cookies.set('sidebarStatus', 0)
			this.sidebar.opened = false
			this.sidebar.withoutAnimation = withoutAnimation
		},
		// 隐藏侧边栏
		toggleSideBarHide(status) {
			this.sidebar.hide = status
		},
		// 切换设备类型
		toggleDevice(device) {
			this.device = device
		},
		// 设置组件大小
		setSize(size) {
			this.size = size
			Cookies.set('size', size)
		},
	}
})

export default useAppStore
