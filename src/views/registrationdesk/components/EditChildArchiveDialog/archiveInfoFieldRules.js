export default {
	// 基本信息
	archiveCode: [],
	patientName: [
		{ required: true, message: '请输入儿童姓名', trigger: 'blur' }
	],
	sex: [
		{ required: true, message: '请选择儿童性别', trigger: 'change' }
	],
	birthDate: [
		{ required: true, message: '请选择出生日期', trigger: 'change' }
	],
	birthTime: [],
	birthNumber: [
		{ pattern: /^[0-9.]+$/, message: '请输入数字', trigger: 'blur', type: 'number' },
	],
	hospitalType: [
		{ required: true, message: '请选择医院地区类型', trigger: 'change' }
	],
	birthOrg: [
		{ required: true, message: '请选择出生医院', trigger: 'change' }
	],
	healthCard: [
		{ pattern: /^[0-9.]+$/, message: '请输入数字', trigger: 'blur', type: 'number' },
	],
	nationalityCode: [
		{ required: true, message: '请选择国籍', trigger: 'change' }
	],
	idCardType: [
		{ required: true, message: '请选择证件类型', trigger: 'change' }
	],
	idCardNumber: [
		{ required: true, message: '请输入证件号码', trigger: 'blur' },
	],
	nationCode: [],
	// 管理信息
	liveProvinceCode: [],
	liveCityCode: [],
	liveCountyCode: [],
	liveStreetCode: [
		{ required: true, message: '请完善家庭地址信息', trigger: 'change' }
	],
	currentAddrDetail: [
		{ required: true, message: '请输入家庭详细地址', trigger: 'blur' }
	],
	resProvinceCode: [],
	resCityCode: [],
	resCountyCode: [],
	resStreetCode: [
		{ required: true, message: '请完善户籍地址信息', trigger: 'change' }
	],
	permanentAddrDetail: [
		{ required: true, message: '请输入户籍详细地址', trigger: 'blur' }
	],
	currentAddrCode: [
		{ required: true, message: '请输入现住地址编码', trigger: 'blur' }
	],
	accountAttribute: [
		{ required: true, message: '请选择户口属性', trigger: 'change' }
	],
	regionCode: [
		{ required: true, message: '请选择区域划分', trigger: 'change' }
	],
	permanentAddrCode: [
		{ required: true, message: '请输入户籍县国标', trigger: 'blur' }
	],
	archiveState: [
		{ required: true, message: '请选择在册情况', trigger: 'change' }
	],
	resAttribute: [
		{ required: true, message: '请选择户籍属性', trigger: 'change' }
	],
	filingUniteName: [],
	filingPerson: [],
	filingDate: [],
	filingUnite: [
		{ required: true, message: '请输入建档单位编码', trigger: 'blur' }
	],
	manageDeptCode: [
		{ required: true, message: '请输入现管单位编码', trigger: 'blur' }
	],
	manageTime: [
		{ required: true, message: '请选择起始管理日期', trigger: 'change' }
	],
	// 出生信息
	birthWeight: [
		{ required: true, message: '请输入出生体重', trigger: 'blur' },
		{ pattern: /^[0-9.]+$/, message: '请输入数字', trigger: 'blur', type: 'number' },
		{ message: '请输入大于0的数字', trigger: 'blur', type: 'number', min: 1 },
	],
	parity: [
		{ required: true, message: '请选择胎次', trigger: 'change' },
	],
	gestationalAge: [
		{ required: true, message: '请选择胎龄', trigger: 'change' },
	],
	foetusDay: [
		{ required: true, message: '请选择胎龄', trigger: 'change' },
	],
	hivType: [
		{ required: true, message: '请选择Hiv类型', trigger: 'change' },
	],
	chDiseaseSign: [],
	chDiseaseDesc: [],
	immuneDeficiencySign: [],
	immuneDeficiencyDesc: [],
	otherDiseasesType: [],
	diseaseDesc: [],
	allergySign: [],
	allergyDesc: [],
	vaccinationTabooSign: [],
	vaccinationTabooDesc: [],
	contraindicatedVaccine: [],
	infectiousHistory: [],
	infectiousHistoryDesc: [],
	// 监护人信息
	motherName: [],
	motherTel: [],
	motherIdType: [],
	motherIdCard: [],
	fatherName: [],
	fatherTel: [],
	fatherIdType: [],
	fatherIdCard: [],
	contacts: [],
	contactsTel: [],
	contactsRelCode: [],
	remark: [],
	// 家族史
	familyImmunefunctionSign: [],
	familyImmunefunctionDesc: [],
	familialInheritanceSign: [],
	familialInheritanceDesc: [],
	hepatitisMother: [
		{ required: true, message: '请选择母亲HBsAG', trigger: 'change' }
	],
	motherHbsagDesc: [],
	motherHivPositive: [],
	motherHivDesc: [],
	motherDiseaseSign: [],
	motherDiseaseDesc: []
}
