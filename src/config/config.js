const systemAreaKey = import.meta.env.VITE_APP_SYSTEM_AREA

const systemAreaConfig = {
	'JXWS': {
		logoTitleZH: '江西微盛信息产业有限公司',
		logoTitleEN: 'Jiangxi microsun it industry corporation',
	},
	'PXCDC': {
		logoTitleZH: '萍乡市预防接种门诊系统',
		logoTitleEN: 'Pingxiang vaccination outpatient system'
	}
}

export default {
	...systemAreaConfig[systemAreaKey]
}
