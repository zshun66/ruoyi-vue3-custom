/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-12 17:17:54
 * @FilePath: \ruoyi-ui\src\store\modules\settings.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-11 14:44:27
 * @FilePath: \ruoyi-ui\src\store\modules\settings.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import defaultSettings from '@/config/settings'

const { sideTheme, showSettings, topNav, crumbsView, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || {}

const state = {
  title: '',
  theme: storageSetting.theme || '#409EFF',
  sideTheme: storageSetting.sideTheme || sideTheme,
  showSettings: showSettings,
  topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
  crumbsView: storageSetting.crumbsView === undefined ? crumbsView : storageSetting.crumbsView,
  tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
  fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
  sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
  dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
}
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  // 修改布局设置
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  // 设置网页标题
  setTitle({ commit }, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

