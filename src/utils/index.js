/**
 * 获取浏览器地址栏中的地址携带的参数
 * @param {string} url 地址
 * @returns {Object}
 */
export function getQueryObject(url) {
	url = url == null ? window.location.href : url
	const search = url.substring(url.lastIndexOf('?') + 1)
	const obj = {}
	const reg = /([^?&=]+)=([^?&=]*)/g
	search.replace(reg, (rs, $1, $2) => {
		const name = decodeURIComponent($1)
		let val = decodeURIComponent($2)
		val = String(val)
		obj[name] = val
		return rs
	})
	return obj
}

/**
 * 获取字符串字节数
 * @param {string} str
 */
export function byteLength(str) {
	let len = str.length
	for (var i = str.length - 1; i >= 0; i--) {
		const code = str.charCodeAt(i)
		if (code > 0x7f && code <= 0x7ff) len++
		else if (code > 0x7ff && code <= 0xffff) len += 2
		if (code >= 0xDC00 && code <= 0xDFFF) i--
	}
	return len
}

/**
 * 合并两个对象，赋予最后一个对象优先级
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
	if (typeof target !== 'object') {
		target = {}
	}
	if (Array.isArray(source)) {
		return source.slice()
	}
	Object.keys(source).forEach(property => {
		const sourceProperty = source[property]
		if (typeof sourceProperty === 'object') {
			target[property] = objectMerge(target[property], sourceProperty)
		} else {
			target[property] = sourceProperty
		}
	})
	return target
}

/**
 * 切换元素类名
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
	if (!element || !className) {
		return
	}
	let classString = element.className
	const nameIndex = classString.indexOf(className)
	if (nameIndex === -1) {
		classString += '' + className
	} else {
		classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
	}
	element.className = classString
}

/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result

	const later = function () {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function (...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

/**
 * 深拷贝
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments', 'deepClone')
	}
	const targetObj = source.constructor === Array ? [] : {}
	Object.keys(source).forEach(keys => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}

/**
 * 生成随机唯一的字符串
 * @returns {string}
 */
export function createUniqueString() {
	const timestamp = +new Date() + ''
	const randomNum = parseInt((1 + Math.random()) * 65536) + ''
	return (+(randomNum + timestamp)).toString(32)
}

export function makeMap(str, expectsLowerCase) {
	const map = Object.create(null)
	const list = str.split(',')
	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true
	}
	return expectsLowerCase
		? val => map[val.toLowerCase()]
		: val => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
	html: {
		indent_size: '2',
		indent_char: ' ',
		max_preserve_newlines: '-1',
		preserve_newlines: false,
		keep_array_indentation: false,
		break_chained_methods: false,
		indent_scripts: 'separate',
		brace_style: 'end-expand',
		space_before_conditional: true,
		unescape_strings: false,
		jslint_happy: false,
		end_with_newline: true,
		wrap_line_length: '110',
		indent_inner_html: true,
		comma_first: false,
		e4x: true,
		indent_empty_lines: true
	},
	js: {
		indent_size: '2',
		indent_char: ' ',
		max_preserve_newlines: '-1',
		preserve_newlines: false,
		keep_array_indentation: false,
		break_chained_methods: false,
		indent_scripts: 'normal',
		brace_style: 'end-expand',
		space_before_conditional: true,
		unescape_strings: false,
		jslint_happy: true,
		end_with_newline: true,
		wrap_line_length: '110',
		indent_inner_html: true,
		comma_first: false,
		e4x: true,
		indent_empty_lines: true
	}
}

// 首字母大小
export function titleCase(str) {
	return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
	return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
	return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

