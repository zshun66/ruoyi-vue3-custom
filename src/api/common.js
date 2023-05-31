import request from '@/utils/request'

// 获取当前登陆者单位信息
export function getCurrDeptInfo() {
  return request({
    url: '/system/dept/getDeptInfo',
    method: 'get'
  })
}

// 获取当前登陆者单位的区域划分数据
export function getCurrDeptRegionDivide() {
  return request({
    url: '/archives/divisionl/getDivisionOption',
    method: 'get'
  })
}
