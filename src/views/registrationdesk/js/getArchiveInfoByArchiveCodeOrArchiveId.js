import {
	getArchiveInfoByArchiveCode,
	getArchiveInfoByArchiveId,
} from '@/api/archive.js'

/**
 * 根据档案编码code或者档案id获取档案信息
 * @param {*} value 档案编码code或档案id
 * @param {*} type 类型 code | id
 * @param {*} alertErrorMsg 是否弹出错误信息
 */
export default function getArchiveInfoByArchiveCodeOrArchiveId(value, type = 'code', alertErrorMsg = true) {
	return new Promise(async resolve => {
		let fn = null
		if (type == 'code') fn = getArchiveInfoByArchiveCode
		if (type == 'id') fn = getArchiveInfoByArchiveId
		let res = await fn(value, alertErrorMsg).catch(error => {
			resolve({ result: false, data: null, msg: error.message })
		})
		if (!res) {
			resolve({ result: false, data: null, msg: res })
		} else {
			// 接种状态为已接种的列表
			let inoculationedList = []
			// 有接种日期的列表
			let inoculationDateList = []
			res.data.vaccinationRecords.forEach(item => {
				if (item.inoculationState == '1') {
					inoculationedList.push(item)
				}
				if (item.vaccinationDate) {
					inoculationDateList.push(item)
				}
			})

			// 获取最近的接种留观状态
			inoculationedList.sort((a, b) => {
				return Date.parse(new Date(b.vaccinationDate)) - Date.parse(new Date(a.vaccinationDate))
			})
			res.data.childrenArchive.lastObservationState = (inoculationedList[0] || {}).observationState
			// 获取最近的接种日期
			inoculationDateList.sort((a, b) => {
				return new Date(b.vaccinationDate).getTime() - new Date(a.vaccinationDate).getTime()
			})
			res.data.childrenArchive.lastInoculationDate = (inoculationDateList[0] || {}).vaccinationDate

			resolve({
				result: true,
				data: {
					archiveBaseInfo: res.data.childrenArchive || {},
					vaccinableList: res.data.vaccinableList || [],
					inoculationRecord: res.data.vaccinationRecords || [],
					bespeakVaccineList: res.data.bespeakVaccineList || [],
					tabooVaccineList: res.data.contraindicationVaccines || [],
				},
				msg: ''
			})
		}
	})
}
