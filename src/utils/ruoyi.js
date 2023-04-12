

/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

/**
 * 表单重置
 * @param {*} refName
 */
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields()
	}
}

/**
 * 添加日期范围
 * @param {*} params
 * @param {*} dateRange
 * @param {*} propName
 */
export function addDateRange(params, dateRange, propName) {
	let search = params
	search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
	dateRange = Array.isArray(dateRange) ? dateRange : []
	if (typeof (propName) === 'undefined') {
		search.params['beginTime'] = dateRange[0]
		search.params['endTime'] = dateRange[1]
	} else {
		search.params['begin' + propName] = dateRange[0]
		search.params['end' + propName] = dateRange[1]
	}
	return search
}

/**
 * 回显数据字典
 * @param {*} datas
 * @param {*} value
 */
export function selectDictLabel(datas = [], value, valueField = 'value', labelField = 'label') {
	if (value === undefined || value === null || value === '') {
		return ''
	}
	if (!Array.isArray(datas)) {
		return value
	}
	let labels = []
	let values = Array.from(value)
	values.forEach(value => {
		let findRes = datas.find(item => item[valueField] == value)
		if (findRes) {
			labels.push(findRes[labelField])
		} else {
			labels.push(value)
		}
	})

	return labels.join(',')
}

/**
 * 数据合并
 * @param {*} source
 * @param {*} target
 */
export function mergeRecursive(source, target) {
	for (var p in target) {
		try {
			if (target[p].constructor == Object) {
				source[p] = mergeRecursive(source[p], target[p])
			} else {
				source[p] = target[p]
			}
		} catch (e) {
			source[p] = target[p]
		}
	}
	return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	}

	var childrenListMap = {}
	var nodeIds = {}
	var tree = []

	for (let d of data) {
		let parentId = d[config.parentId]
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = []
		}
		nodeIds[d[config.id]] = d
		childrenListMap[parentId].push(d)
	}

	for (let d of data) {
		let parentId = d[config.parentId]
		if (nodeIds[parentId] == null) {
			tree.push(d)
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t)
	}

	function adaptToChildrenList(o) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]]
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c)
			}
		}
	}
	return tree
}

/**
 * params请求参数处理
 * @param {Object} params 请求的参数
 * @param {Boolean} isCleanEmpty 是否清除空字符串字段
 */
export function tansParams(params, isCleanEmpty) {
	let result = ''
	if (typeof params === 'object') {
		for (let key in params) {
			if (params[key] === undefined || params[key] === null) {
				delete params[key]
			}
			if (params[key] === '' && isCleanEmpty) {
				delete params[key]
			}
		}
	}
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		var part = encodeURIComponent(propName) + '='
		if (typeof value === 'object') {
			for (const key of Object.keys(value)) {
				if (value[key] !== null && value[key] !== '' && typeof (value[key]) !== 'undefined') {
					let params = propName + '[' + key + ']'
					var subPart = encodeURIComponent(params) + '='
					result += subPart + encodeURIComponent(value[key]) + '&'
				}
			}
		} else {
			result += part + encodeURIComponent(value) + '&'
		}
	}
	return result
}

/**
 * data请求参数处理
 * @param {Object} data 请求的参数
 * @param {Boolean} isCleanEmpty 是否清除空字符串字段
 */
export function tansData(data, isCleanEmpty) {
	if (typeof data === 'object') {
		for (let key in data) {
			if (data[key] === undefined || data[key] === null) {
				delete data[key]
			}
			if (data[key] === '' && isCleanEmpty) {
				delete data[key]
			}
		}
	}
	return data
}

/**
 * 验证是否为blob格式
 * @param {*} data
 */
export async function blobValidate(data) {
	// return data.type !== 'application/json'
	try {
		const text = await data.text()
		JSON.parse(text)
		return false
	} catch (error) {
		return true
	}
}
