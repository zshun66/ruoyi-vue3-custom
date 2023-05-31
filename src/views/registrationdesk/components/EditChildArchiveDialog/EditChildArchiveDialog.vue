<script setup name="EditChildArchiveDialog">
	import AddressSelector from '@/mycomponents/AddressSelector/AddressSelector.vue'
	import archiveInfoField from './archiveInfoField.js'
	import archiveInfoFieldRules from './archiveInfoFieldRules.js'
	import useUserStore from '@/store/modules/user.js'
	import { getCurrDeptInfo, getCurrDeptRegionDivide } from '@/api/common.js'
	import { getSubcategoryVaccinum } from '@/api/vaccinum.js'
	import { addChildArchive, editChildArchive } from '@/api/archive.js'

	const { proxy } = getCurrentInstance()
	const userStore = useUserStore()

	const tabooVaccineList = inject('tabooVaccineList', () => [])
	const sexDict = inject('sexDict', () => [])
	const hospitalTypeDict = inject('hospitalTypeDict', () => [])
	const nationalityDict = inject('nationalityDict', () => [])
	const cardTypeDict = inject('cardTypeDict', () => [])
	const nationTypeDict = inject('nationTypeDict', () => [])
	const hasNotDict = inject('hasNotDict', () => [])
	const sunTypeDict = inject('sunTypeDict', () => [])
	const guardianshipDict = inject('guardianshipDict', () => [])
	const accountAttributeDict = inject('accountAttributeDict', () => [])
	const archiveStatusDict = inject('archiveStatusDict', () => [])
	const resAttributeDict = inject('resAttributeDict', () => [])
	const pastMedicalHistoryDict = inject('pastMedicalHistoryDict', () => [])

	const childArchiveInfoFormRef = ref(null)

	// 弹框类型(1新建 2修改 3完善)
	const dialogType = ref(1)
	// 是否显示弹框
	const showDialog = ref(false)
	// 档案信息表单
	const archiveInfoForm = ref(archiveInfoField)
	// 档案信息表单规则
	const archiveInfoFormRules = reactive(archiveInfoFieldRules)
	// 区域划分数据
	const regionDivideList = ref([])
	// 当前单位信息
	const currDeptInfo = ref(null)
	// 次类疫苗数据
	const subcategoryVaccinumList = ref([])
	// 确认按钮是否加载中
	const	btnLoading = ref(false)

	// 家庭地址编码集
	const liveAddress = computed(() => ({
		provinceCode: archiveInfoForm.value.liveProvinceCode,
		cityCode: archiveInfoForm.value.liveCityCode,
		countyCode: archiveInfoForm.value.liveCountyCode,
		streetCode: archiveInfoForm.value.liveStreetCode,
	}))
	// 户籍地址编码集
	const resAddress = computed(() => ({
		provinceCode: archiveInfoForm.value.resProvinceCode,
		cityCode: archiveInfoForm.value.resCityCode,
		countyCode: archiveInfoForm.value.resCountyCode,
		streetCode: archiveInfoForm.value.resStreetCode,
	}))

	// 监听弹框打开事件
	proxy.$mitt.on('on-openEditChildArchiveDialog', async ({ dialog:type = 1, data = {} }) => {
		dialogType.value = type
		showDialog.value = true
		getCurrDeptRegionDivideFunc()
		getSubcategoryVaccinumListFunc()
		if (type == 1) {
			await getCurrDeptInfoFunc()
			archiveInfoForm.value.filingUniteName = userStore.userInfo.dept.deptName
			archiveInfoForm.value.filingPerson = userStore.userInfo.nickName || ''
			archiveInfoForm.value.filingDate = proxy.$formatTime(new Date())
			archiveInfoForm.value.filingUnite = userStore.userInfo.dept.deptCode || ''
			archiveInfoForm.value.manageDeptCode = userStore.userInfo.dept.deptCode || ''
			archiveInfoForm.value.manageTime = proxy.$formatTime(new Date())
		} else if (type == 2 || type == 3) {
			Object.assign(archiveInfoForm, data)
			archiveInfoForm.value.contraindicatedVaccine = tabooVaccineList
		}
	})



	// 获取当前登陆者单位的区域划分数据
	const getCurrDeptRegionDivideFunc = async function () {
		if (regionDivideList.value.length <= 0) {
			let res = await getCurrDeptRegionDivide()
			if (!res) return
			regionDivideList.value = res.data || []
		}
	}

	// 获取次类疫苗数据
	const getSubcategoryVaccinumListFunc = async function () {
		if (subcategoryVaccinumList.value.length <= 0) {
			let res = await getSubcategoryVaccinum()
			if (!res) return
			subcategoryVaccinumList.value = res.data.records || []
		}
	}

	// 获取当前登陆者单位信息
	const getCurrDeptInfoFunc = async function (type = 'all') {
		if (!currDeptInfo.value) {
			let res = await getCurrDeptInfo()
			currDeptInfo.value = res.data || null
		}
		if (!currDeptInfo.value) return
		const setLiveAddressInfo = function () {
			archiveInfoForm.value.liveProvinceCode = currDeptInfo.value.provinceCode || ''
			archiveInfoForm.value.liveCityCode = currDeptInfo.value.cityCode || ''
			archiveInfoForm.value.liveCountyCode = currDeptInfo.value.countryCode || currDeptInfo.value.areaCode || ''
			archiveInfoForm.value.liveStreetCode = currDeptInfo.value.streetCode || ''
		}
		const setResAddressInfo = function () {
			archiveInfoForm.value.resProvinceCode = currDeptInfo.value.provinceCode || ''
			archiveInfoForm.value.resCityCode = currDeptInfo.value.cityCode || ''
			archiveInfoForm.value.resCountyCode = currDeptInfo.value.countryCode || currDeptInfo.value.areaCode || ''
			archiveInfoForm.value.resStreetCode = currDeptInfo.value.streetCode || ''
		}
		if (type == 'all') {
			setLiveAddressInfo()
			setResAddressInfo()
		} else if (type == 'live') {
			setLiveAddressInfo()
		} else if (type == 'res') {
			setResAddressInfo()
		}
	}

	// 处理暂未获取按钮
	const handleTempNotGetBtn = function (type = 'child') {
		if (type == 'child') {
			archiveInfoForm.value.idCardType = '88'
			archiveInfoForm.value.idCardNumber = '888888888888888888'
		} else if (type == 'mother') {
			archiveInfoForm.value.motherIdType = '88'
			archiveInfoForm.value.motherIdCard = '888888888888888888'
		} else if (type == 'father') {
			archiveInfoForm.value.fatherIdType = '88'
			archiveInfoForm.value.fatherIdCard = '888888888888888888'
		}
	}

	// 处理本地按钮
	const handleLocalBtn = function (type = 'live') {
		getCurrDeptInfoFunc(type)
	}

	// 处理同上同下按钮
	const handleSameUpOrSameDownBtn = function (type = 'up') {
		if (type == 'up') {
			archiveInfoForm.value.resProvinceCode = archiveInfoForm.value.liveProvinceCode
			archiveInfoForm.value.resProvince = archiveInfoForm.value.liveProvince
			archiveInfoForm.value.resCityCode = archiveInfoForm.value.liveCityCode
			archiveInfoForm.value.resCity = archiveInfoForm.value.liveCity
			archiveInfoForm.value.resCountyCode = archiveInfoForm.value.liveCountyCode
			archiveInfoForm.value.resCounty = archiveInfoForm.value.liveCounty
			archiveInfoForm.value.resStreetCode = archiveInfoForm.value.liveStreetCode
			archiveInfoForm.value.resStreet = archiveInfoForm.value.liveStreet
			archiveInfoForm.value.permanentAddrDetail = archiveInfoForm.value.currentAddrDetail
		} else if (type == 'down') {
			archiveInfoForm.value.liveProvinceCode = archiveInfoForm.value.resProvinceCode
			archiveInfoForm.value.liveProvince = archiveInfoForm.value.resProvince
			archiveInfoForm.value.liveCityCode = archiveInfoForm.value.resCityCode
			archiveInfoForm.value.liveCity = archiveInfoForm.value.resCity
			archiveInfoForm.value.liveCountyCode = archiveInfoForm.value.resCountyCode
			archiveInfoForm.value.liveCounty = archiveInfoForm.value.resCounty
			archiveInfoForm.value.liveStreetCode = archiveInfoForm.value.resStreetCode
			archiveInfoForm.value.liveStreet = archiveInfoForm.value.resStreet
			archiveInfoForm.value.currentAddrDetail = archiveInfoForm.value.permanentAddrDetail
		}
	}

	// 选择的家庭地址改变时
	const handleLiveAddressChange = function (data) {
		archiveInfoForm.value.liveProvinceCode = data.provinceCode
		archiveInfoForm.value.liveProvince = data.provinceName
		archiveInfoForm.value.liveCityCode = data.cityCode
		archiveInfoForm.value.liveCity = data.cityName
		archiveInfoForm.value.liveCountyCode = data.countyCode
		archiveInfoForm.value.liveCounty = data.countyName
		archiveInfoForm.value.liveStreetCode = data.streetCode
		archiveInfoForm.value.liveStreet = data.streetName
		archiveInfoForm.value.currentAddrCode = data.streetCode
	}
	// 选择的户籍地址改变时
	const	handleResAddressChange = function (data) {
		archiveInfoForm.value.resProvinceCode = data.provinceCode
		archiveInfoForm.value.resProvince = data.provinceName
		archiveInfoForm.value.resCityCode = data.cityCode
		archiveInfoForm.value.resCity = data.cityName
		archiveInfoForm.value.resCountyCode = data.countyCode
		archiveInfoForm.value.resCounty = data.countyName
		archiveInfoForm.value.resStreetCode = data.streetCode
		archiveInfoForm.value.resStreet = data.streetName
		archiveInfoForm.value.permanentAddrCode = data.countyCode
	}

	// 判断监护人信息是否填写完整
	const isGuardianInfoComplete = function () {
		let motherInfo = archiveInfoForm.value.motherName &&
			archiveInfoForm.value.motherTel &&
			archiveInfoForm.value.motherIdType &&
			archiveInfoForm.value.motherIdCard
		let fatherInfo = archiveInfoForm.value.fatherName &&
			archiveInfoForm.value.fatherTel &&
			archiveInfoForm.value.fatherIdType &&
			archiveInfoForm.value.fatherIdCard
		let guardianInfo = archiveInfoForm.value.contacts &&
			archiveInfoForm.value.contactsTel &&
			archiveInfoForm.value.contactsRelCode
		return motherInfo || fatherInfo || guardianInfo
	}

	// 判断禁忌疫苗信息是否填写完整
	const isTabooVaccineComplete = function () {
		if (archiveInfoForm.value.contraindicatedVaccine.length <= 0) {
			return true
		} else {
			return archiveInfoForm.value.contraindicatedVaccine.every(item => item.vaccineCode)
		}
	}

	// 点击确定
	const handleEditChildArchiveConfirm = async function () {
		// console.log(archiveInfoForm.value)
		let isValid = await childArchiveInfoFormRef.value.validate().catch(invalidFields => {
			for (let key in invalidFields) {
				childArchiveInfoFormRef.value.scrollToField(key)
				break
			}
		})
		if (isValid) {
			if (!isGuardianInfoComplete()) {
				proxy.$message.error('母亲、父亲、其他监护人至少填写一位')
				childArchiveInfoFormRef.value.scrollToField('motherName')
				return
			}
			if (!isTabooVaccineComplete()) {
				proxy.$message.error('请完善禁忌疫苗信息')
				childArchiveInfoFormRef.value.scrollToField('vaccinationTabooSign')
				return
			}

			const data = JSON.parse(JSON.stringify(archiveInfoForm.value))
			data.regionName = regionDivideList.value.find(item => item.code == data.regionCode)?.name || ''
			console.log(data)

			let fn = null
			if (dialogType.value == 1) {
				fn = addChildArchive
			} else if (dialogType.value == 2 || dialogType.value == 3) {
				fn = editChildArchive
			}
		}
	}
	// 弹框彻底关闭
	const handleClosedDialog = function () {

	}
</script>

<template>
	<div class="component-container edit-child-archive-dialog-component">
		<el-dialog
			class="edit-child-archive-dialog"
			width="1200px"
			v-model="showDialog"
			:close-on-click-modal="false"
			:append-to-body="false"
			:show-close="dialogType !== 3"
			:close-on-press-escape="dialogType !== 3"
			@closed="handleClosedDialog"
		>
			<template #header>
				<div class="dialog-title">
					<span class="title-text" v-if="dialogType == 1">新建儿童档案</span>
					<span class="title-text" v-if="dialogType == 2">修改儿童档案</span>
					<span class="title-text" v-if="dialogType == 3">完善儿童档案</span>
					<span class="require-text">(*为必填项)</span>
				</div>
			</template>

			<div class="dialog-content">
				<el-form
					class="form-class"
					ref="childArchiveInfoFormRef"
					inline
					:model="archiveInfoForm"
					:rules="archiveInfoFormRules"
					label-position="right"
				>
					<div class="form-item-wrap">
						<div class="wrap-title">基本信息</div>
						<el-form-item label="儿童编码" prop="archiveCode">
							<el-input
								style="width: 200px;"
								disabled
								v-model="archiveInfoForm.archiveCode"
								placeholder="系统自动生成"
							></el-input>
						</el-form-item>
						<el-form-item
							label="儿童姓名"
							prop="patientName"
							ref="patientNameFormItem"
						>
							<el-input
								style="width: 150px;"
								v-model="archiveInfoForm.patientName"
								placeholder="请输入儿童姓名"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="儿童性别" prop="sex" ref="sexFormItem">
							<el-select
								style="width: 150px;"
								v-model="archiveInfoForm.sex"
								placeholder="儿童性别"
							>
								<el-option
									v-for="dict in sexDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="出生日期"
							prop="birthDate"
							ref="birthDateFormItem"
						>
							<CusElDatePicker
								style="width: 165px;"
								type="date"
								v-model="archiveInfoForm.birthDate"
								placeholder="出生日期"
								:disabled-date="(time) => {
									return time.getTime() > Date.now()
								}"
							></CusElDatePicker>
							<el-time-picker
								style="width: 132px;"
								v-model="archiveInfoForm.birthTime"
								placeholder="选择时分秒"
								value-format="HH:mm:ss"
							></el-time-picker>
						</el-form-item>
						<el-form-item
							label="出生证号"
							prop="birthNumber"
							ref="birthNumberFormItem"
						>
							<el-input
								style="width: 200px;"
								v-model.number="archiveInfoForm.birthNumber"
								placeholder="请输入出生证号"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item
							label="出生医院"
							prop="hospitalType"
							ref="hospitalTypeFormItem"
						>
							<el-select
								style="width: 150px;"
								v-model="archiveInfoForm.hospitalType"
								placeholder="请选择"
							>
								<el-option
									v-for="dict in hospitalTypeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="birthOrg" ref="birthOrgFormItem">
							<el-input
								style="width: 300px;"
								v-model="archiveInfoForm.birthOrg"
								placeholder="请选择出生医院"
								readonly
							></el-input>
						</el-form-item>
						<el-form-item label="电子健康证" prop="healthCard">
							<el-input
								style="width: 220px;"
								v-model.number="archiveInfoForm.healthCard"
								placeholder="请输入电子健康证"
							></el-input>
						</el-form-item>
						<el-form-item
							label="国籍"
							prop="nationalityCode"
							label-width="66px"
							ref="nationalityCodeFormItem"
						>
							<el-select
								style="width: 200px;"
								v-model="archiveInfoForm.nationalityCode"
								placeholder="请选择"
							>
								<el-option
									v-for="dict in nationalityDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="证件类型"
							prop="idCardType"
							ref="idCardTypeFormItem"
						>
							<el-select
								style="width: 150px;"
								v-model="archiveInfoForm.idCardType"
								placeholder="请选择"
							>
								<el-option
									v-for="dict in cardTypeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="idCardNumber" ref="idCardNumberFormItem">
							<el-input
								style="width: 260px;"
								v-model="archiveInfoForm.idCardNumber"
								placeholder="请输入证件号码"
								clearable
								:disabled="archiveInfoForm.idCardType == '88'"
							></el-input>
							<el-button style="margin-left: 10px" type="primary" link @click="handleTempNotGetBtn('child')">暂未获取</el-button>
						</el-form-item>
						<el-form-item
							label="民族"
							prop="nationCode"
							label-width="100px"
							ref="nationCodeFormItem"
						>
							<el-select
								style="width: 160px;"
								v-model="archiveInfoForm.nationCode"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in nationTypeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-item-wrap">
						<div class="wrap-title">管理信息</div>
						<el-form-item label="家庭地址" prop="liveStreetCode">
							<AddressSelector
								:address="liveAddress"
								@change="handleLiveAddressChange"
							/>
							<el-button style="margin-left: 5px" type="primary" link @click="handleLocalBtn('live')">本地</el-button>
						</el-form-item>
						<el-form-item
							label="具体地址"
							prop="currentAddrDetail"
							ref="currentAddrDetailFormItem"
						>
							<el-input
								style="width: 300px;"
								v-model="archiveInfoForm.currentAddrDetail"
								placeholder="请输入家庭详细地址"
								clearable
							></el-input>
							<el-button style="margin-left: 5px" type="primary" link @click="handleSameUpOrSameDownBtn('down')">同下</el-button>
						</el-form-item>
						<el-form-item label="户籍地址" prop="resStreetCode">
							<AddressSelector :address="resAddress" @change="handleResAddressChange" />
							<el-button style="margin-left: 5px" type="primary" link @click="handleLocalBtn('res')">本地</el-button>
						</el-form-item>
						<el-form-item
							label="具体地址"
							prop="permanentAddrDetail"
							ref="permanentAddrDetailFormItem"
						>
							<el-input
								style="width: 300px;"
								v-model="archiveInfoForm.permanentAddrDetail"
								placeholder="请输入户籍详细地址"
								clearable
							></el-input>
							<el-button style="margin-left: 5px" type="primary" link @click="handleSameUpOrSameDownBtn('up')">同上</el-button>
						</el-form-item>
						<el-form-item
							label="现住地址编码"
							prop="currentAddrCode"
							ref="currentAddrCodeFormItem"
						>
							<el-input
								style="width: 160px;"
								v-model="archiveInfoForm.currentAddrCode"
								placeholder="请输入现住地址编码"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item
							label="户口属性"
							prop="accountAttribute"
							ref="accountAttributeFormItem"
						>
							<el-select
								style="width: 170px;"
								v-model="archiveInfoForm.accountAttribute"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in accountAttributeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="区域划分" prop="regionCode" ref="regionCodeFormItem">
							<el-select
								style="width: 250px;"
								v-model="archiveInfoForm.regionCode"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="item in regionDivideList"
									:key="item.value"
									:label="item.name"
									:value="item.code"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="户籍县国标"
							prop="permanentAddrCode"
							ref="permanentAddrCodeFormItem"
						>
							<el-input
								style="width: 160px;"
								v-model="archiveInfoForm.permanentAddrCode"
								placeholder="请输入户籍县国标"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item
							label="在册情况"
							prop="archiveState"
							ref="archiveStateFormItem"
						>
							<el-select
								style="width: 185px;"
								v-model="archiveInfoForm.archiveState"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in archiveStatusDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="户籍属性"
							prop="resAttribute"
							ref="resAttributeFormItem"
						>
							<el-select
								style="width: 175px;"
								v-model="archiveInfoForm.resAttribute"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in resAttributeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="建档单位" prop="filingUniteName">
							<el-input
								style="width: 300px;"
								v-model="archiveInfoForm.filingUniteName"
								placeholder="请输入建档单位"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item label="建档人" prop="filingPerson">
							<el-input
								style="width: 160px;"
								v-model="archiveInfoForm.filingPerson"
								placeholder="请输入建档人"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item label="建档日期" prop="filingDate">
							<CusElDatePicker
								style="width: 200px;"
								type="date"
								v-model="archiveInfoForm.filingDate"
								placeholder="建档日期"
								disabled
								:disabled-date="(time) => {
									return time.getTime() > Date.now()
								}"
							></CusElDatePicker>
						</el-form-item>
						<el-form-item
							label="建档单位编码"
							prop="filingUnite"
							ref="filingUniteFormItem"
						>
							<el-input
								style="width: 155px;"
								v-model="archiveInfoForm.filingUnite"
								placeholder="请输入建档单位编码"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item
							label="现管单位编码"
							prop="manageDeptCode"
							ref="manageDeptCodeFormItem"
						>
							<el-input
								style="width: 155px;"
								v-model="archiveInfoForm.manageDeptCode"
								placeholder="请输入现管单位编码"
								disabled
							></el-input>
						</el-form-item>
						<el-form-item
							label="起始管理日期"
							prop="manageTime"
							ref="manageTimeFormItem"
						>
							<CusElDatePicker
								style="width: 200px;"
								type="date"
								v-model="archiveInfoForm.manageTime"
								placeholder="起始管理日期"
								:disabled-date="(time) => {
									return time.getTime() > Date.now()
								}"
							></CusElDatePicker>
						</el-form-item>
					</div>
					<div class="form-item-wrap">
						<div class="wrap-title">出生信息</div>
						<el-form-item label="出生体重" prop="birthWeight" ref="birthWeightFormItem">
							<el-input
								style="width: 200px;"
								v-model.number="archiveInfoForm.birthWeight"
								placeholder="请输入出生体重"
								clearable
							>
								<template #append>克</template>
							</el-input>
						</el-form-item>
						<el-form-item label="胎次" prop="parity">
							<el-select
								style="width: 160px;"
								v-model="archiveInfoForm.parity"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="index in 10"
									:key="index"
									:label="index"
									:value="index"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="胎龄" prop="gestationalAge" style="margin-right: 0px;">
							<el-select
								style="width: 120px;"
								v-model="archiveInfoForm.gestationalAge"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="index in 31"
									:key="index"
									:label="31 - index + 10"
									:value="31 - index + 10"
								></el-option>
							</el-select>
							<span class="el-select__append">周</span>
						</el-form-item>
						<el-form-item label="" prop="foetusDay">
							<el-select
								style="width: 120px;"
								v-model="archiveInfoForm.foetusDay"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="index in 7"
									:key="index"
									:label="7 - index"
									:value="7 - index"
								></el-option>
							</el-select>
							<span class="el-select__append">天</span>
						</el-form-item>
						<el-form-item label="Hiv" prop="hivType">
							<el-select
								style="width: 180px;"
								v-model="archiveInfoForm.hivType"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in sunTypeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							label="是否有先天性心脏病"
							prop="chDiseaseSign"
							label-width="180px"
						>
							<el-radio-group
								v-model="archiveInfoForm.chDiseaseSign"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="chDiseaseDesc"
							label-width="250px"
						>
							<el-input
								style="width: 580px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.chDiseaseDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="是否有原发性免疫功能缺陷"
							prop="immuneDeficiencySign"
							label-width="180px"
						>
							<el-radio-group
								v-model="archiveInfoForm.immuneDeficiencySign"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="immuneDeficiencyDesc"
							label-width="250px"
						>
							<el-input
								style="width: 580px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.immuneDeficiencyDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="出生时是否有其他疾病"
							prop="otherDiseasesType"
							label-width="180px"
						>
							<el-radio-group
								v-model="archiveInfoForm.otherDiseasesType"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="diseaseDesc"
							label-width="250px"
						>
							<el-input
								style="width: 580px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.diseaseDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="是否有过敏史"
							prop="allergySign"
							label-width="180px"
						>
							<el-radio-group
								v-model="archiveInfoForm.allergySign"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="allergyDesc"
							label-width="250px"
						>
							<el-input
								style="width: 580px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.allergyDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="是否有接种禁忌"
							prop="vaccinationTabooSign"
							label-width="180px"
						>
							<el-radio-group
								v-model="archiveInfoForm.vaccinationTabooSign"
								@change="archiveInfoForm.contraindicatedVaccine = []"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="vaccinationTabooDesc"
							label-width="250px"
						>
							<el-input
								:style="{ width: archiveInfoForm.vaccinationTabooSign == '1' ? '434px' : '580px' }"
								placeholder="请输入说明"
								v-model="archiveInfoForm.vaccinationTabooDesc"
							></el-input>
							<el-button
								type="primary"
								plain
								icon="Plus"
								style="margin-left: 10px;"
								v-if="archiveInfoForm.vaccinationTabooSign == '1'"
								@click="archiveInfoForm.contraindicatedVaccine.push({})"
							>添加禁忌疫苗</el-button>
						</el-form-item>
						<template v-for="(item, index) in archiveInfoForm.contraindicatedVaccine" :key="index">
							<el-form-item
								label="禁忌疫苗"
								label-width="180px"
								:rules="[{ required: true, message: '请选择禁忌疫苗', trigger: 'change' }]"
							>
								<el-select
									style="width: 250px;"
									v-model="item.vaccineCode"
									placeholder="请选择"
									clearable
									filterable
								>
									<el-option
										v-for="vacc in subcategoryVaccinumList"
										:key="vacc.id"
										:label="vacc.vaccineName"
										:value="vacc.vaccineCode"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item
								label="说明"
								label-width="104px"
							>
								<el-input
									style="width: 540px;"
									placeholder="请输入说明"
									v-model="item.vaccinationTabooDesc"
								></el-input>
								<div style="margin-left: 10px; cursor: pointer;" @click="archiveInfoForm.contraindicatedVaccine.splice(index, 1)">
									<el-icon size="25px" color="red"><Remove /></el-icon>
								</div>
							</el-form-item>
						</template>
						<el-form-item
							label="是否有既往传染病史"
							prop="infectiousHistory"
							label-width="180px"
						>
							<el-radio-group
								v-model="archiveInfoForm.infectiousHistory"
								@change="archiveInfoForm.infectiousHistoryDesc = ''"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
								>{{ dict.label }}</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="infectiousHistoryDesc"
							label-width="250px"
						>
							<el-select
								style="width: 580px;"
								v-model="archiveInfoForm.infectiousHistoryDesc"
								placeholder="请选择"
								clearable
								filterable
								:disabled="archiveInfoForm.infectiousHistory == '2'"
							>
								<el-option
									v-for="dict in pastMedicalHistoryDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
					</div>
					<div class="form-item-wrap">
						<div class="wrap-title">
							<span>监护人信息</span>
							<span class="text-red">（母亲、父亲、其他监护人至少填写一位）</span>
						</div>
						<el-form-item label="母亲姓名" prop="motherName">
							<el-input
								style="width: 160px;"
								v-model="archiveInfoForm.motherName"
								placeholder="请输入母亲姓名"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="母亲电话" prop="motherTel">
							<el-input
								style="width: 180px;"
								v-model="archiveInfoForm.motherTel"
								placeholder="请输入母亲电话"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="母亲证件类型" prop="motherIdType">
							<el-select
								style="width: 150px;"
								v-model="archiveInfoForm.motherIdType"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in cardTypeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="motherIdCard">
							<el-input
								style="width: 290px;"
								v-model="archiveInfoForm.motherIdCard"
								placeholder="请输入母亲证件号码"
								clearable
								:disabled="archiveInfoForm.motherIdType == '88'"
							></el-input>
							<el-button style="margin-left: 10px" type="primary" link @click="handleTempNotGetBtn('mother')">暂未获取</el-button>
						</el-form-item>
						<el-form-item label="父亲姓名" prop="fatherName">
							<el-input
								style="width: 160px;"
								v-model="archiveInfoForm.fatherName"
								placeholder="请输入父亲姓名"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="父亲电话" prop="fatherTel">
							<el-input
								style="width: 180px;"
								v-model="archiveInfoForm.fatherTel"
								placeholder="请输入父亲电话"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="父亲证件类型" prop="fatherIdType">
							<el-select
								style="width: 150px;"
								v-model="archiveInfoForm.fatherIdType"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in cardTypeDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="fatherIdCard">
							<el-input
								style="width: 290px;"
								v-model="archiveInfoForm.fatherIdCard"
								placeholder="请输入父亲证件号码"
								clearable
								:disabled="archiveInfoForm.fatherIdType == '88'"
							></el-input>
							<el-button style="margin-left: 10px" type="primary" link @click="handleTempNotGetBtn('father')">暂未获取</el-button>
						</el-form-item>
						<el-form-item label="其他监护人姓名" prop="contacts">
							<el-input
								style="width: 230px;"
								v-model="archiveInfoForm.contacts"
								placeholder="请输入其他监护人姓名"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="其他监护人电话" prop="contactsTel">
							<el-input
								style="width: 240px;"
								v-model="archiveInfoForm.contactsTel"
								placeholder="请输入其他监护人电话"
								clearable
							></el-input>
						</el-form-item>
						<el-form-item label="其他监护人关系" prop="contactsRelCode">
							<el-select
								style="width: 300px;"
								v-model="archiveInfoForm.contactsRelCode"
								placeholder="请选择"
								clearable
							>
								<el-option
									v-for="dict in guardianshipDict"
									:key="dict.value"
									:label="dict.label"
									:value="dict.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注" prop="remark">
							<el-input
								style="width: 1080px;"
								v-model="archiveInfoForm.remark"
								placeholder="请输入备注"
								clearable
							></el-input>
						</el-form-item>
					</div>
					<div class="form-item-wrap">
						<div class="wrap-title">家族史</div>
						<el-form-item
							label="家族成员是否有免疫功能异常"
							prop="familyImmunefunctionSign"
						>
							<el-radio-group
								v-model="archiveInfoForm.familyImmunefunctionSign"
							>
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="familyImmunefunctionDesc"
							label-width="250px"
						>
							<el-input
								style="width: 565px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.familyImmunefunctionDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="家族成员是否有遗传病史"
							prop="familialInheritanceSign"
							label-width="194px"
						>
							<el-radio-group v-model="archiveInfoForm.familialInheritanceSign">
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="familialInheritanceDesc"
							label-width="250px"
						>
							<el-input
								style="width: 565px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.familialInheritanceDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="母亲HBsAG"
							prop="hepatitisMother"
							ref="hepatitisMotherFormItem"
							label-width="194px"
						>
							<el-radio-group v-model="archiveInfoForm.hepatitisMother">
								<el-radio
									v-for="dict in sunTypeDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="motherHbsagDesc"
							label-width="125px"
						>
							<el-input
								style="width: 565px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.motherHbsagDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="母亲HIV标志"
							prop="motherHivPositive"
							label-width="194px"
						>
							<el-radio-group v-model="archiveInfoForm.motherHivPositive">
								<el-radio
									v-for="dict in sunTypeDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="说明" prop="motherHivDesc" label-width="125px">
							<el-input
								style="width: 565px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.motherHivDesc"
							></el-input>
						</el-form-item>
						<el-form-item
							label="母亲其他疾病"
							prop="motherDiseaseSign"
							label-width="194px"
						>
							<el-radio-group v-model="archiveInfoForm.motherDiseaseSign">
								<el-radio
									v-for="dict in hasNotDict"
									:key="dict.value"
									:label="dict.value"
									>{{ dict.label }}</el-radio
								>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="说明"
							prop="motherDiseaseDesc"
							label-width="250px"
						>
							<el-input
								style="width: 565px;"
								placeholder="请输入说明"
								v-model="archiveInfoForm.motherDiseaseDesc"
							></el-input>
						</el-form-item>
					</div>
				</el-form>
			</div>

			<template #footer>
				<div class="dialog-footer">
					<el-button
						type="primary"
						icon="CircleCheck"
						:loading="btnLoading"
						@click="handleEditChildArchiveConfirm"
					>确 定</el-button>
					<el-button
						icon="CircleClose"
						@click="showDialog = false"
						v-if="dialogType !== 3"
					>取 消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss">
.edit-child-archive-dialog-component {
	:deep(.edit-child-archive-dialog) {
		background: #ebeff7;
		.dialog-title {
			.title-text {
				font-size: 18px;
			}
			.require-text {
				font-size: 18px;
				color: #f00;
				margin-left: 10px;
			}
		}
		.dialog-content {
			.form-class {
				.wrap-title {
					color: #1890ff;
					font-size: 17px;
					font-weight: bold;
					margin-bottom: 20px;
					.text-red {
						color: #f00;
					}
				}
				.form-item-wrap {
					background: #fff;
					padding: 15px 15px;
					border-radius: 5px;
					.el-select__append {
						display: inline-block;
						height: 32px;
						line-height: 30px;
						background-color: #F5F7FA;
						color: #909399;
						border: 1px solid #DCDFE6;
						border-radius: 4px;
						padding: 0 15px;
						white-space: nowrap;
						box-sizing: border-box;
					}
				}
				.form-item-wrap + .form-item-wrap {
					margin-top: 10px;
				}
			}
		}
		.dialog-footer {
			text-align: center;
		}
	}
}
</style>
