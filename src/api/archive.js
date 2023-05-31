/*
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-24 13:01:49
 * @FilePath: \ruoyi-ui\src\api\archive.js
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '@/utils/request'

// 根据档案编码获取档案信息
export function getArchiveInfoByArchiveCode(archiveCode, alertErrorMsg = true) {
  return request({
    url: `/archives/child/getChildArchivesByCode/${archiveCode}`,
    method: 'get',
		headers: {
      alertErrorMsg: alertErrorMsg
    }
  })
}

// 根据档案id获取档案信息
export function getArchiveInfoByArchiveId(archiveId, alertErrorMsg = true) {
  return request({
    url: `/archives/child/getChildArchives/${archiveId}`,
    method: 'get',
		headers: {
      alertErrorMsg: alertErrorMsg
    }
  })
}

// 查询儿童档案列表(实为查询的省平台的数据)
export function getChildArchivesList(data) {
	return request({
		url: '/archives/child/getArchivesList',
		method: 'post',
		data: data
	})
}

// 查询成人档案列表(实为查询的省平台的数据)
export function getAdultArchivesList(data, alertErrorMsg = true) {
	return request({
		url: '/wv/archives/getAdultInfoVoList',
		method: 'post',
		data: data,
		headers: {
      alertErrorMsg: alertErrorMsg
    }
	})
}

// 根据档案编码查询档案是否属于登录的单位一致
export function checkArchiveBelongDept(code) {
  return request({
    url: `/archives/child/checkArchivesDept/${code}`,
    method: 'get'
  })
}

// 根据档案id查询档案是否完善
export function checkArchivePerfect(archiveId) {
  return request({
    url: `/archives/child/checkArchives/${archiveId}`,
    method: 'get',
  })
}

// 新增儿童档案
export function addChildArchive(data) {
  return request({
    url: '/archives/child/saveChildArchives',
    method: 'post',
    data: data,
  })
}

// 编辑儿童档案
export function editChildArchive(data) {
  return request({
    url: '/archives/child/editChildArchives',
    method: 'post',
    data: data,
  })
}
