/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-12 17:26:56
 * @FilePath: \ruoyi-ui\src\config\settings.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
module.exports = {
  /**
   * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
   */
  sideTheme: 'theme-light',

  /**
   * 是否系统布局配置
   */
  showSettings: false,

  /**
   * 是否显示顶部导航
   */
  topNav: false,

	/**
   * 是否显示 面包屑导航
   */
  crumbsView: true,

  /**
   * 是否显示 tagsView
   */
  tagsView: true,

  /**
   * 是否固定头部
   */
  fixedHeader: false,

  /**
   * 是否显示logo
   */
  sidebarLogo: false,

  /**
   * 是否显示动态标题
   */
  dynamicTitle: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
