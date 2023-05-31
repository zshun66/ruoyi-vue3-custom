import { createApp } from 'vue'
import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

import '@/assets/styles/index.scss'

import App from './App'
import router from './router'
import './router/permission'
import store from './store'
import directive from './directive'
import plugins from './plugins'

import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import systemConfig from '@/config/config'
import { getConfigKey } from '@/api/system/config'
import { useDict } from '@/utils/dict'
import { checkPermi } from '@/utils/power'
import { exportFile } from '@/utils/request'
import { formatTime, formatTimeToAgeYM, formatTimeToDiff } from '@/utils/format'
import { resetForm, addDateRange, selectDictLabel, handleTree, mergeTableRow } from '@/utils/ruoyi'
import mitt from '@/utils/mitt'

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
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect'
// 字典标签组件
import DictTag from '@/components/DictTag'
// 二次封装日期选择器组件
import CusElDatePicker from '@/mycomponents/CusElDatePicker/CusElDatePicker'


const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.$systemConfig = systemConfig
app.config.globalProperties.$getConfigKey = getConfigKey
app.config.globalProperties.$useDict = useDict
app.config.globalProperties.$checkPermi = checkPermi
app.config.globalProperties.$exportFile = exportFile
app.config.globalProperties.$formatTime = formatTime
app.config.globalProperties.$formatTimeToAgeYM = formatTimeToAgeYM
app.config.globalProperties.$formatTimeToDiff = formatTimeToDiff
app.config.globalProperties.$resetForm = resetForm
app.config.globalProperties.$addDateRange = addDateRange
app.config.globalProperties.$selectDictLabel = selectDictLabel
app.config.globalProperties.$handleTree = handleTree
app.config.globalProperties.$mergeTableRow = mergeTableRow
app.config.globalProperties.$mitt = mitt

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)
app.component('CusElDatePicker', CusElDatePicker)

app.use(router)
app.use(store)
app.use(directive)
app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

app.use(ElementPlus, {
	locale: locale,
	// 支持 large、default、small
	size: Cookies.get('size') || 'default'
})

app.mount('#app')

console.log(import.meta.env)
