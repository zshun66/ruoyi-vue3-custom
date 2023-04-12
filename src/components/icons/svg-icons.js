/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-04 13:55:24
 * @FilePath: \ruoyi-ui\src\components\icons\svg-icons.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default svgIcons
