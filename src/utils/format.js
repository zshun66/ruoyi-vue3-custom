/**
 * 格式化时间(例如：2023-04-10 14:36:55 周二)
 * @param {*} time 需要格式化的时间
 * @param {*} format 时间格式(YYYY-MM-DD HH:mm:ss WW)
 */
export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
	if (time === undefined || time === null || time === '') {
		return ''
	}
	let date = new Date(time)
	if (isNaN(date).valueOf()) {
		return time
	}

	const formatObj = {
		YYYY: date.getFullYear(),
		MM: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
		DD: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
		HH: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
		mm: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
		ss: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
		WW: '周' + ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
	}
	for (const key in formatObj) {
		format = format.replace(key, formatObj[key])
	}
	return format
}

/**
 * 计算年龄，返回X岁X月
 * @param {*} birthDate 出生日期
 * @param {*} calcDate 计算日期
 */
export function formatTimeToAgeYM(birthDate, calcDate = new Date()) {
	if (
		(birthDate === undefined || birthDate === null || birthDate === '') ||
		(isNaN(new Date(birthDate)).valueOf())
	) {
		return ''
	}
	var date1 = new Date(birthDate).toLocaleDateString()
	var date1Year = Number(date1.split('/')[0])
	var date1Month = Number(date1.split('/')[1])
	var date1Day = Number(date1.split('/')[2])

	var date2 = new Date(calcDate).toLocaleDateString()
	var date2Year = Number(date2.split('/')[0])
	var date2Month = Number(date2.split('/')[1])
	var date2Day = Number(date2.split('/')[2])

	var resultYear = date2Year - date1Year
	var resultMonth = 0

	if (date2Month < date1Month || (date2Month == date1Month && date2Day < date1Day)) {
		resultYear -= 1
		resultMonth = 12 - date1Month + date2Month
	} else {
		resultMonth = date2Month - date1Month
	}
	if (date2Day < date1Day) {
		resultMonth -= 1
	}
	if (resultMonth >= 12) {
		resultYear += 1
		resultMonth -= 12
	}
	return resultYear + '岁' + resultMonth + '月'
}

/**
 * 计算时间差(例如：刚刚、n分钟前、n小时前、n天前、n月前、n年前)
 * @param {number} time
 */
export function formatTimeToDiff(time) {
	if (time === undefined || time === null || time === '') {
		return ''
	}
	let date = new Date(time)
	if (isNaN(date).valueOf()) {
		return time
	}

	let calc_timestamp = date.getTime()
	let curr_timestamp = Date.now()
	let diff = curr_timestamp - calc_timestamp
	// 小于1分钟
	if (diff < 60 * 1000) {
		return '刚刚'
	}
	// 大于等于1分钟 & 小于1小时
	else if (diff >= 60 * 1000 && diff < 60 * 60 * 1000) {
		return Math.ceil(diff / 1000 / 60) + '分钟前'
	}
	// 大于等于1小时 & 小于1天
	else if (diff >= 60 * 60 * 1000 && diff < 24 * 60 * 60 * 1000) {
		return Math.floor(diff / 1000 / 60 / 60) + '小时前'
	}
	// 大于等于1天 & 小于1月
	else if (diff >= 24 * 60 * 60 * 1000 && diff < 30 * 24 * 60 * 60 * 1000) {
		return Math.floor(diff / 1000 / 60 / 60 / 24) + '天前'
	}
	// 大于等于1月 & 小于1年
	else if (diff >= 30 * 24 * 60 * 60 * 1000 && diff < 12 * 30 * 24 * 60 * 60 * 1000) {
		return Math.floor(diff / 1000 / 60 / 60 / 24 / 30) + '月前'
	}
	// 大于等于1年
	else {
		return Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12) + '年前'
	}
}
