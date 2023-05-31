/**
 *  fullscreen (全屏插件)
 *
 *  @author zshun
 *  @version 1.0
 *  @updatetime 2023.5.30
 *  @param {Boolean}      isEnabled     		当前浏览器全屏是否可用
 *  @param {Boolean}      isFullscreen  		当前是否已全屏
 *  @param {HTMLElement}  element						当前全屏的元素
 *  @param {Function}     isFullscreenByEl	判断指定元素是否处于全屏
 *  @param {Function}     request						进入全屏，参数：(element: 变为全屏的元素，默认为HTML根元素, options: 全屏配置)，返回 Promise<resolve>
 *  @param {Function}     exit					 		退出全屏，仅返回 Promise<resolve>
 *  @param {Function}     toggle        		切换全屏，参数：(element: 变为全屏的元素，仅切换为全屏时生效, options: 全屏配置，仅切换为全屏时生效)，返回 Promise<resolve>
 *  @param {Function}     onchange      		全屏状态改变时的操作 (仅可赋值更改)
 *  @param {Function}     onerror       		全屏改变时返回错误的操作 (仅可赋值更改)
 */

const instance = {}

let changeHandler = null
let errorHandler = null

const resolve = function (value) {
	return typeof Promise === 'undefined' ? value : value instanceof Promise ? value.catch(Promise.resolve.bind(Promise)) : Promise.resolve(value)
}

Object.defineProperties(instance, {
	/**
	 * 当前浏览器全屏是否可用
	 */
	isEnabled: {
		enumerable: true,
		get: function () {
			return !!(
				document.fullscreenEnabled ||
				document.webkitFullscreenEnabled ||
				document.mozFullScreenEnabled ||
				document.msFullscreenEnabled
			)
		}
	},
	/**
	 * 当前是否已全屏
	 */
	isFullscreen: {
		enumerable: true,
		get: function () {
			// return !!(
			// 	document.fullscreen ||
			// 	document.webkitIsFullScreen ||
			// 	document.webkitFullScreen ||
			// 	document.mozFullScreen ||
			// 	document.msFullScreen
			// )
			return !!(
				document.fullscreenElement ||
				document.webkitFullscreenElement ||
				document.webkitCurrentFullScreenElement ||
				document.mozFullScreenElement ||
				document.msFullscreenElement
			)
		}
	},
	/**
	 * 当前全屏的元素
	 */
	element: {
		enumerable: true,
		get: function () {
			return (
				document.fullscreenElement ||
				document.webkitFullscreenElement ||
				document.webkitCurrentFullScreenElement ||
				document.mozFullScreenElement ||
				document.msFullscreenElement
			)
		}
	},
	/**
	 * 判断元素是否处于全屏
	 */
	isFullscreenByEl: {
		enumerable: true,
		value: function (element) {
			if (!element) return false
			return element === this.fullscreenElement
		}
	},
	/**
	 * 请求进入全屏
	 */
	request: {
		enumerable: true,
		value: function (element, options) {
			if (!element) {
				element = document.documentElement
			} else if (typeof element === 'string') {
				element = document.querySelector(element)
			}

			if (element.requestFullscreen) {
				return resolve(element.requestFullscreen(options))
			} else if (element.webkitRequestFullScreen) {
				return resolve(element.webkitRequestFullScreen(options))
			} else if (element.mozRequestFullScreen) {
				return resolve(element.mozRequestFullScreen(options))
			} else if (element.msRequestFullscreen) {
				return resolve(element.msRequestFullscreen(options))
			}
		}
	},
	/**
	 * 退出全屏
	 */
	exit: {
		enumerable: true,
		value: function () {
			if (document.exitFullScreen) {
				return resolve(document.exitFullScreen())
			} else if (document.webkitExitFullscreen) {
				return resolve(document.webkitExitFullscreen())
			} else if (document.mozCancelFullScreen) {
				return resolve(document.mozCancelFullScreen())
			} else if (element.msExitFullscreen) {
				return resolve(element.msExitFullscreen())
			}
		}
	},
	/**
	 * 切换全屏
	 */
	toggle: {
		enumerable: true,
		value: function (element, options) {
			if (!element) {
				element = document.documentElement
			} else if (typeof element === 'string') {
				element = document.querySelector(element)
			}

			if (this.isFullscreenByEl(element)) {
				return this.exit()
			} else {
				return this.request(element, options)
			}
		}
	},
	/**
	 * 切换全屏
	 */
	toggleBogus: {
		enumerable: true,
		value: function (element, { enterStyle = {}, exitStyle = {} }, options) {
			const documentElement = document.documentElement
			let targetElement = element
			if (!targetElement) {
				targetElement = document.body
			} else if (typeof targetElement === 'string') {
				targetElement = document.querySelector(targetElement)
			}

			if (this.isFullscreenByEl(documentElement)) {
				for (let key in exitStyle) {
					targetElement.style[key] = exitStyle[key]
				}
				return this.exit()
			} else {
				for (let key in enterStyle) {
					targetElement.style[key] = enterStyle[key]
				}
				return this.request(documentElement, options)
			}
		}
	},
	/**
	 * 监听全屏变化事件
	 */
	onChange: {
		enumerable: true,
		get: function () {
			return changeHandler
		},
		set: function (value) {
			let eventNameArr = [
				'fullscreenchange',
				'webkitfullscreenchange',
				'mozfullscreenchange',
				'msfullscreenchange'
			]
			eventNameArr.forEach(eventName => {
				if (changeHandler) {
					document.removeEventListener(eventName, changeHandler)
				}
				changeHandler = typeof value == 'function' ? value : null
				document.addEventListener(eventName, changeHandler, false)
			})
		}
	},
	/**
	 * 监听全屏变化发生错误事件
	 */
	onError: {
		enumerable: true,
		get: function () {
			return errorHandler
		},
		set: function (value) {
			let eventNameArr = [
				'fullscreenerror',
				'webkitfullscreenerror',
				'mozfullscreenerror',
				'msfullscreenerror'
			]
			eventNameArr.forEach(eventName => {
				if (errorHandler) {
					document.removeEventListener(eventName, errorHandler)
				}
				errorHandler = typeof value == 'function' ? value : null
				document.addEventListener(eventName, errorHandler, false)
			})
		}
	}
})

setTimeout(() => {
	instance.toggleBogus('.vaccine-record-container', {
		enterStyle: {
			position: 'fixed',
			top: '0',
			right: '0',
			bottom: '0',
			left: '0',
			zIndex: '9',
			borderRadius: '0px'
		}
	})
}, 3000)

export default instance
