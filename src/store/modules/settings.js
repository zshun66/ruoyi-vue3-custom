import defaultSettings from '@/config/settings'

const {
	title,
	sideTheme,
	showSettings,
	topNav,
	crumbsView,
	tagsView,
	fixedHeader,
	sidebarLogo,
	dynamicTitle
} = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || {}

const useSettingsStore = defineStore('settings', {
	state: () => ({
		theme: storageSetting.theme || '#409EFF',

		title: storageSetting.title === undefined ? title : storageSetting.title,
		sideTheme: storageSetting.sideTheme === undefined ? sideTheme : storageSetting.sideTheme,
		showSettings: storageSetting.showSettings === undefined ? showSettings : storageSetting.showSettings,
		topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
		crumbsView: storageSetting.crumbsView === undefined ? crumbsView : storageSetting.crumbsView,
		tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
		fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
		sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
		dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
	}),
	actions: {
		// 修改布局设置
		changeSetting(data) {
			const { key, value } = data
			if (this.hasOwnProperty(key)) {
				this[key] = value
			}
		},
		// 设置网页标题
		setTitle(title) {
			if (this.dynamicTitle) {
				document.title = title + ' - ' + this.title
			} else {
				document.title = this.title
			}
		}
	}
})

export default useSettingsStore
