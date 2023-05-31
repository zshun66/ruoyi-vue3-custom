import { getAdultArchivesList } from '@/api/archive.js'

/**
 * 根据身份证号查询档案编码
 * @param {*} idCard 身份证号
 */
export default function getArchiveCodeByIdCard (idCard) {
	return new Promise(async resolve => {
		const params = {
			pageIndex: 1,
			pageSize: 1,
			idCard: idCard,
			queryFlag: '1' // 1省内 4省外
		}
		let res = await getAdultArchivesList(params, false).catch(err => {})
		if (!res || res.data.length <= 0) {
			params.queryFlag = '4'
			let res2 = await getAdultArchivesList(params, false).catch(err => {})
			if (!res2 || res2.data.length <= 0) {
				resolve({ result: false })
			} else {
				resolve({ result: true, code: res2.data[0].code })
			}
		} else {
			resolve({ result: true, code: res.data[0].code })
		}
	})
}
