/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 14:18:15
 * @FilePath: \ruoyi-ui\src\main.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import App from './App'
import store from './store'
import router from './router'
import directive from './directive'
import plugins from './plugins'

import './router/permission'

import { getDicts } from '@/api/system/dict/data'
import { getConfigKey } from '@/api/system/config'
import { formatTime, formatTimeToAgeYM, formatTimeToDiff } from '@/utils/format'
import { resetForm, addDateRange, selectDictLabel, handleTree } from '@/utils/ruoyi'
import { exportFile } from '@/utils/request'

import './assets/icons'
import Element from 'element-ui'

import '@/assets/styles/index.scss'

// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from '@/components/Editor'
// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'

// 全局方法挂载
Vue.prototype.$getDicts = getDicts
Vue.prototype.$getConfigKey = getConfigKey
Vue.prototype.$formatTime = formatTime
Vue.prototype.$formatTimeToAgeYM = formatTimeToAgeYM
Vue.prototype.$formatTimeToDiff = formatTimeToDiff
Vue.prototype.$resetForm = resetForm
Vue.prototype.$addDateRange = addDateRange
Vue.prototype.$selectDictLabel = selectDictLabel
Vue.prototype.$handleTree = handleTree
Vue.prototype.$exportFile = exportFile

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('DictTag', DictTag)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)

Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
DictData.install()

Vue.use(Element, {
  size: Cookies.get('size') || 'small'
})

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.$bus = app
