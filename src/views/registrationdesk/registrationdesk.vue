<script setup name="registrationdesk">
	import TopHeader from './components/TopHeader/TopHeader.vue' // 顶部输入框区域
	import ArchiveBaseInfo from './components/ArchiveBaseInfo/ArchiveBaseInfo.vue' // 档案基本信息
	import Vaccinable from './components/Vaccinable/Vaccinable.vue' // 可接种疫苗
	import InoculationRecord from './components/InoculationRecord/InoculationRecord.vue' // 接种记录
	import EditChildArchiveDialog from './components/EditChildArchiveDialog/EditChildArchiveDialog.vue' // 编辑儿童档案弹框
	import RegistrationVaccinumDialog from './components/RegistrationVaccinumDialog/RegistrationVaccinumDialog.vue' // 登记疫苗弹框
	import SelectInoculateTypeDialog from './components/SelectInoculateTypeDialog/SelectInoculateTypeDialog.vue' // 接种类型选择弹框
	import IndividualCaseSyncDialog from './components/IndividualCaseSyncDialog/IndividualCaseSyncDialog.vue' // 个案同步弹框

	import getArchiveInfoByArchiveCodeOrArchiveId from './js/getArchiveInfoByArchiveCodeOrArchiveId.js'
	import getArchiveCodeByIdCard from './js/getArchiveCodeByIdCard.js'

	import {
		checkArchiveBelongDept,
		checkArchivePerfect,
	} from '@/api/archive.js'

	const { proxy } = getCurrentInstance()
	// 字典数据
	const dicts = proxy.$useDict(
		'sys_user_sex', // 性别
		'other_diseases', // 有无
		'wv_archives_status', // 档案状态
		'wv_inoculation_state', // 接种状态
		'vaccination_positionType', // 接种部位
		'vaccination_vaccinateType', // 接种类型
		'wv_hospital_type', // 医院地区类型
		'sys_nationality', // 国籍
		'wv_child_cardtype', // 证件类型
		'wv_archives_nationType', // 民族
		'sun_type', // 阴性阳性类型
		'guardianship', // 亲人关系
		'wv_account_attribute', // 户口属性
		'wv_res_attribute', // 户籍属性
		'past_medical_history', // 传染病
		'vaccine_property', // 疫苗属性
		'child_birthInterval', // 时间单位
	)

	// 档案基本信息
	const archiveBaseInfo = ref({})
	// 可接种疫苗
	const vaccinableList = ref([])
	// 接种记录
	const inoculationRecord = ref([])
	// 预约记录
	const bespeakVaccineList = ref([])
	// 禁忌疫苗
	const tabooVaccineList = ref([])

	provide('sexDict', dicts.sys_user_sex)
	provide('hasNotDict', dicts.other_diseases)
	provide('archiveStatusDict', dicts.wv_archives_status)
	provide('inoculationStatusDict', dicts.wv_inoculation_state)
	provide('inoculationSiteDict', dicts.vaccination_positionType)
	provide('inoculationTypeDict', dicts.vaccination_vaccinateType)
	provide('hospitalTypeDict', dicts.wv_hospital_type)
	provide('nationalityDict', dicts.sys_nationality)
	provide('cardTypeDict', dicts.wv_child_cardtype)
	provide('nationTypeDict', dicts.wv_archives_nationType)
	provide('sunTypeDict', dicts.sun_type)
	provide('guardianshipDict', dicts.guardianship)
	provide('accountAttributeDict', dicts.wv_account_attribute)
	provide('resAttributeDict', dicts.wv_res_attribute)
	provide('pastMedicalHistoryDict', dicts.past_medical_history)
	provide('vaccinePropertyDict', dicts.vaccine_property)
	provide('timeUnitDict', dicts.child_birthInterval)

	provide('archiveBaseInfo', archiveBaseInfo)
	provide('vaccinableList', vaccinableList)
	provide('inoculationRecord', inoculationRecord)
	provide('bespeakVaccineList', bespeakVaccineList)
	provide('tabooVaccineList', tabooVaccineList)


	/**
	 * 编码或id或身份证号输入框确认搜索
	 * @param {*} value 档案编码或档案id或身份证号
	 * @param {*} type 类型 code | id
	 * @param {*} isIdCard 是否需要支持身份证查询
	 */
	const handleConfirmSearch = async function (value, type = 'code', isIdCard = false) {
		proxy.$modal.loading('正在加载数据，请稍后')
		let res1 = await getArchiveInfoByArchiveCodeOrArchiveId(value, type, false)
		if (!res1.result) {
			if (isIdCard) {
				// 编码或id查询失败 走身份证查询
				let res2 = await getArchiveCodeByIdCard(value)
				if (res2.result) {
					let res3 = await getArchiveInfoByArchiveCodeOrArchiveId(res2.code, type, true)
					if (res3.result) {
						assignmentArchiveInfo(res3.data)
						checkArchiveBelongDeptFunc(archiveBaseInfo.value.archiveCode)
						checkArchivePerfectFunc(archiveBaseInfo.value.id)
					}
					proxy.$modal.closeLoading()
				} else {
					proxy.$modal.closeLoading()
					proxy.$message.error(res1.msg)
				}
			} else {
				proxy.$modal.closeLoading()
			}
		} else {
			assignmentArchiveInfo(res1.data)
			proxy.$modal.closeLoading()
			checkArchiveBelongDeptFunc(archiveBaseInfo.value.archiveCode)
			checkArchivePerfectFunc(archiveBaseInfo.value.id)
		}
	}

	/**
	 * 给档案信息赋值
	 */
	const assignmentArchiveInfo = (data) => {
		archiveBaseInfo.value = data.archiveBaseInfo
		vaccinableList.value = data.vaccinableList
		inoculationRecord.value = data.inoculationRecord
		bespeakVaccineList.value = data.bespeakVaccineList
		tabooVaccineList.value = data.tabooVaccineList
	}

	/**
	 * 检查现管单位是否为当前登录单位
	 */
	const checkArchiveBelongDeptFunc = async function (archiveCode) {
		let res = await checkArchiveBelongDept(archiveCode)
		if (res && !res.data) {
			// TODO 不属于当前单位 弹出框
			proxy.$mitt.emit('on-openSelectInoculateTypeDialog', {})
		}
	}

	/**
	 * 检查档案信息是否完善
	 */
	 const checkArchivePerfectFunc = async function (archiveId) {
		let res = await checkArchivePerfect(archiveId)
		if (res && res.data) {
			// TODO true：档案信息不完善 弹出框
		}
	}
</script>

<template>
	<div class="page-container registrationdesk-page">
		<div class="header-wrapper">
			<TopHeader
				@on-search="handleConfirmSearch($event, 'code', true)"
			/>
		</div>
		<div class="content-wrapper">
			<div class="content-top-wrapper">
				<div class="archive-base-info-wrapper">
					<ArchiveBaseInfo />
				</div>
				<div class="vaccinable-wrapper">
					<Vaccinable />
				</div>
			</div>
			<div class="content-bottom-wrapper">
				<div class="inoculation-record-wrapper">
					<InoculationRecord />
				</div>
			</div>
		</div>

		<EditChildArchiveDialog />
		<RegistrationVaccinumDialog />
		<SelectInoculateTypeDialog />
		<IndividualCaseSyncDialog />
	</div>
</template>

<style scoped lang="scss">
.registrationdesk-page {
	min-width: 1650px;
	height: 100%;
	padding: 0 0;
	background: #F0FFFE;
	display: flex;
	flex-direction: column;
	.header-wrapper {
		width: 100%;
	}
	.content-wrapper {
		width: 100%;
		height: 100%;
		padding: 10px 10px;
		display: flex;
		flex-direction: column;
		.content-top-wrapper {
			display: flex;
			.archive-base-info-wrapper {
				flex: 7;
				min-width: 1100px;
				height: fit-content;
			}
			.vaccinable-wrapper {
				flex: 3;
				min-width: 500px;
				height: 100%;
				margin-left: 10px;
			}
		}
		.content-bottom-wrapper {
			height: 100%;
			margin-top: 10px;
			display: flex;
			.inoculation-record-wrapper {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
