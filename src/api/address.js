import request from '@/utils/request'

// 获取省份数据
export function getProvinceData() {
	return request({
		url: 'system/area/getAllProvinces',
		method: 'get',
	})
}

// 根据省份编码获取市级数据
export function getCityData(provinceCode) {
	return request({
		url: 'system/area/getCityByProvincesCode/' + provinceCode,
		method: 'get',
	})
}

// 根据市级编码获取区县数据
export function getCountyData(cityCode) {
	return request({
		url: 'system/area/getCountiesByCityCode/' + cityCode,
		method: 'get',
	})
}

// 根据区县编码获取乡镇/街道数据
export function getTownshipData(countyCode) {
	return request({
		url: 'system/area/getTownByCountiesCode/' + countyCode,
		method: 'get',
	})
}

// 根据乡镇/街道编码获取村数据
export function getVillageData(townCode) {
	return request({
		url: 'system/area/getVillageByTownCode/' + townCode,
		method: 'get',
	})
}
