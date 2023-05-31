<script setup name="AddressSelector">
import {
	getProvinceData,
	getCityData,
	getCountyData,
	getTownshipData,
} from '@/api/address.js'

const { proxy } = getCurrentInstance()

const props = defineProps({
	// 传入的地址编码数据
	address: {
		type: Object,
		default: () => {},
	},
	// 组件大小
	size: {
		type: String,
		default: 'default',
	},
	// 省份选择器宽度
	provinceSelectWidth: {
		type: String,
		default: '140px',
	},
	// 市级选择器宽度
	citySelectWidth: {
		type: String,
		default: '140px',
	},
	// 区县选择器宽度
	countySelectWidth: {
		type: String,
		default: '140px',
	},
	// 乡镇选择器宽度
	streetSelectWidth: {
		type: String,
		default: '150px',
	},
})
const emits = defineEmits(['change'])

// 地址表单
const addrForm = ref({
	provinceCode: '', // 省份编码
	provinceName: '', // 省份名称
	cityCode: '', // 市级编码
	cityName: '', // 市级名称
	countyCode: '', // 区县编码
	countyName: '', // 区县名称
	streetCode: '', // 乡镇编码
	streetName: '', // 乡镇名称
})

// 省份数据
const provinceList = ref([])
// 市级数据
const cityList = ref([])
// 区县数据
const countyList = ref([])
// 乡镇数据
const streetList = ref([])

// 获取省份数据
const getProvinceDataFunc = async function () {
	if (provinceList.value.length <= 0) {
		const res = await getProvinceData()
		provinceList.value = (res && res.data) || []
	}
	addrForm.value.provinceName = proxy.$selectDictLabel(
		provinceList.value,
		addrForm.value.provinceCode,
		'code',
		'name',
	)
}
// 根据省份编码获取市级数据
const getCityDataFunc = async function () {
	if (!addrForm.value.provinceCode) return
	const res = await getCityData(addrForm.value.provinceCode)
	if (!res) return
	cityList.value = res.data || []
	addrForm.value.cityName = proxy.$selectDictLabel(
		cityList.value,
		addrForm.value.cityCode,
		'code',
		'name',
	)
}
// 根据市级编码获取区县数据
const getCountyDataFunc = async function () {
	if (!addrForm.value.cityCode) return
	const res = await getCountyData(addrForm.value.cityCode)
	if (!res) return
	countyList.value = res.data || []
	addrForm.value.countyName = proxy.$selectDictLabel(
		countyList.value,
		addrForm.value.countyCode,
		'code',
		'name',
	)
}
// 根据区县编码获取乡镇/街道数据
const getTownshipDataFunc = async function () {
	if (!addrForm.value.countyCode) return
	const res = await getTownshipData(addrForm.value.countyCode)
	if (!res) return
	streetList.value = res.data || []
	addrForm.value.streetName = proxy.$selectDictLabel(
		streetList.value,
		addrForm.value.streetCode,
		'code',
		'name',
	)
}

// 选择的省份改变
const handleProvinceChange = function (value) {
	addrForm.value.cityCode = ''
	addrForm.value.cityName = ''
	addrForm.value.countyCode = ''
	addrForm.value.countyName = ''
	addrForm.value.streetCode = ''
	addrForm.value.streetName = ''
	cityList.value = []
	countyList.value = []
	streetList.value = []
	if (value) {
		addrForm.value.provinceName = proxy.$selectDictLabel(
			provinceList.value,
			addrForm.value.provinceCode,
			'code',
			'name',
		)
		emits('change', addrForm.value)
	}
}

// 选择的市改变
const handleCityChange = function (value) {
	addrForm.value.countyCode = ''
	addrForm.value.countyName = ''
	addrForm.value.streetCode = ''
	addrForm.value.streetName = ''
	countyList.value = []
	streetList.value = []
	if (value) {
		addrForm.value.cityName = proxy.$selectDictLabel(
			cityList.value,
			addrForm.value.cityCode,
			'code',
			'name',
		)
		emits('change', addrForm.value)
	}
}

// 选择的区县改变
const handleCountyChange = function (value) {
	addrForm.value.streetCode = ''
	addrForm.value.streetName = ''
	streetList.value = []
	if (value) {
		addrForm.value.countyName = proxy.$selectDictLabel(
			countyList.value,
			addrForm.value.countyCode,
			'code',
			'name',
		)
		emits('change', addrForm.value)
	}
}

// 选择的乡镇/街道改变
const handleStreetChange = function (value) {
	if (value) {
		addrForm.value.streetName = proxy.$selectDictLabel(
			streetList.value,
			addrForm.value.streetCode,
			'code',
			'name',
		)
		emits('change', addrForm.value)
	}
}


watch(() => props.address, (newv, oldv) => {
	Object.assign(addrForm.value, props.address)
	let R_Arr = []
	if (newv.provinceCode !== oldv.provinceCode) {
		R_Arr = [
			getProvinceDataFunc(),
			getCityDataFunc(),
			getCountyDataFunc(),
			getTownshipDataFunc(),
		]
	} else if (newv.cityCode !== oldv.cityCode) {
		R_Arr = [getCountyDataFunc(), getTownshipDataFunc()]
	} else if (newv.countyCode !== oldv.countyCode) {
		R_Arr = [getTownshipDataFunc()]
	} else if (newv.streetCode !== oldv.streetCode) {
		R_Arr = []
	}
	if (R_Arr.length <= 0) return
	Promise.all(R_Arr).then((res) => {
		emits('change', addrForm.value)
	})
})
</script>

<template>
	<div class="component-container address-selector-component">
		<el-select
			:style="{
				width: provinceSelectWidth,
			}"
			v-model="addrForm.provinceCode"
			placeholder="请选择省"
			:size="size"
			filterable
			clearable
			@change="handleProvinceChange"
		>
			<el-option
				v-for="province in provinceList"
				:key="province.code.toString()"
				:label="province.name"
				:value="province.code.toString()"
			></el-option>
		</el-select>

		<el-select
			:style="{
				width: citySelectWidth,
			}"
			v-model="addrForm.cityCode"
			placeholder="请选择市"
			:size="size"
			filterable
			clearable
			@change="handleCityChange"
		>
			<el-option
				v-for="city in cityList"
				:key="city.code.toString()"
				:label="city.name"
				:value="city.code.toString()"
			></el-option>
		</el-select>

		<el-select
			:style="{
				width: countySelectWidth,
			}"
			v-model="addrForm.countyCode"
			placeholder="请选择区/县"
			:size="size"
			filterable
			clearable
			@change="handleCountyChange"
		>
			<el-option
				v-for="county in countyList"
				:key="county.code.toString()"
				:label="county.name"
				:value="county.code.toString()"
			></el-option>
		</el-select>

		<el-select
			:style="{
				width: streetSelectWidth,
			}"
			v-model="addrForm.streetCode"
			placeholder="请选择乡镇/街道"
			:size="size"
			filterable
			clearable
			@change="handleStreetChange"
		>
			<el-option
				v-for="street in streetList"
				:key="street.code.toString()"
				:label="street.name"
				:value="street.code.toString()"
			></el-option>
		</el-select>
	</div>
</template>

<style scoped lang="scss">
.address-selector-component {
}
</style>
