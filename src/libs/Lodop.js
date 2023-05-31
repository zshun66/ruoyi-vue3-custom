//====页面引用CLodop云打印必须的JS文件：====
(function() {
	let head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
	// 引用双端口(8000和18000）避免其中某个被占用
	let oscript1 = document.createElement('script')
	let oscript2 = document.createElement('script')
	oscript1.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
	oscript2.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
	oscript1.onerror = function (e) {
		console.error('未安装C-Lodop打印驱动或者C-Lodop服务未开启')
	}
	oscript2.onerror = function (e) {
		console.error('未安装C-Lodop打印驱动或者C-Lodop服务未开启')
	}
	head.insertBefore(oscript1, head.firstChild)
	head.insertBefore(oscript2, head.firstChild)
})()

//====获取LODOP对象的主过程：====
export function getLodop(oOBJECT, oEMBED) {
	return new Promise((resolve, reject) => {
		let LODOP = window.getCLodop && window.getCLodop()
		if (LODOP) {
			if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
			if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
			//===如下位置适合调用统一功能(如注册语句、语言选择等):===
			LODOP.SET_LICENSES('安徽奇兵医学科技有限公司', '56E2EB898EE17DEBD030D1E8A683CAFE', '安徽奇兵醫學科技有限公司', '423D486AF17E2120FEB7B2BDDF66F396')
			LODOP.SET_LICENSES('THIRD LICENSE', '', 'AnHui Ace-power Medical and Technology Co., Ltd', '709251107F8D9D680D1A81F88BED121F')
		  resolve(LODOP)
		} else {
			reject(
				`C-Lodop服务未启动或者未安装C-Lodop打印驱动，请开启服务或点击这里<a style="color: #0000ff;"
				href='/src/assets/files/Lodop6.2.2.6_Clodop6.5.7.1_drive.zip' target='_self'>下载安装</a>，
				安装后请刷新页面或重新进入。`
			)
		}
	})
}
