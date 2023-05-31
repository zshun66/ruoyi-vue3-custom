import request from '@/utils/request'

/**
 * 获取疫苗树状数据
 * @param {*} type(1为根据疫苗库存获取 0为不根据疫苗库存获取)
 * @returns
 */
export function getVaccinumTree(type) {
  return request({
    url: `/wv/vaccine/getVaccinateTree/${type}`,
    method: 'get',
  })
}

/**
 * 获取次类疫苗列表
 * @returns
 */
export function getSubcategoryVaccinum() {
  return request({
    url: '/vaccine/subclass/getPage',
    method: 'get',
  })
}

/**
 * 获取次类疫苗列表根据查询参数(暂未使用)
 * @param {*} params 查询参数
 * pageNum || pageSize || categoryVaccineId || vaccineCode || vaccineShort || englishShort || vaccineNature
 * @returns
 */
export function getSubcategoryVaccinumByParams(params) {
  return request({
    url: '/wv/vaccine/list',
    method: 'get',
    params: params,
  })
}

/**
 * 根据可接种疫苗的记录id获取疫苗库存-用于正常登记
 * @param {*} params
 * params.vaccinableIds(用逗号连接的可接种疫苗的记录id) || params.id 档案id
 * @returns
 */
export function getVaccinumStockByVaccinableId(params) {
  return request({
    url: `/wv/registration/arrangeNumber/${params.vaccinableIds}`,
    method: 'get',
    params: {
			id: params.id
		},
  })
}

/**
 * 根据疫苗编码获取疫苗库存-用于自定义登记
 * @param {*} params
 * params.vaccineCode(疫苗编码) || params.id 档案id
 * @returns
 */
export function getVaccinumStockByVaccinumCode(params) {
  return request({
    url: '/wv/registration/customArrange',
    method: 'get',
    params: params,
  })
}
