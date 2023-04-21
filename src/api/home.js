/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 10:16:21
 * @FilePath: \ruoyi-ui\src\api\home.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/utils/request'

// 获取总体一览数据
export function getOverallOverviewData() {
  return request({
    url: '/general/overview',
    method: 'get',
  })
}
