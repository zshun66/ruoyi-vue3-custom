<script setup name="RegistrationVaccinumDialog">
	import {
		getVaccinumTree,
		getVaccinumStockByVaccinumCode,
		getVaccinumStockByVaccinableId,
	} from '@/api/vaccinum.js'
	import useUserStore from '@/store/modules/user.js'

	const { proxy } = getCurrentInstance()
	const userStore = useUserStore()

	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	const cardTypeDict = inject('cardTypeDict', () => [])
	const inoculationSiteDict = inject('inoculationSiteDict', () => [])
	const inoculationTypeDict = inject('inoculationTypeDict', () => [])
	const vaccinePropertyDict = inject('vaccinePropertyDict', () => [])

	// 弹框类型(1正常登记 2自定义登记)
	const dialogType = ref(1)
	// 是否显示弹框
	const showDialog = ref(false)
	// 疫苗树形数据
	const vaccinumTreeList = ref([])
	// 疫苗选择器的实例
	const selectedVaccinumCascaderRef = ref(null)
	// 选择的疫苗
	const selectedVaccinumValue = ref([])
	// 登记的疫苗列表
	const registrationVaccinumList = ref([])
	// 是否显示电子签名
	const showSignature = ref(true)
	// 电子签名base64数据
	const signatureNameBase64 = ref('')
	// 确认按钮是否加载中
	const btnLoading = ref(false)

	// 监听弹框打开事件
	proxy.$mitt.on(
		'on-openRegistrationVaccinumDialog',
		async ({ dialogType:type = 1, vaccinableIds = [] }) => {
			dialogType.value = type
			showDialog.value = true
			if (type == 1) { // 登记
				getVaccinumStock(vaccinableIds)
			} else if (type == 2) { // 自定义登记
				getVaccinumTreeFunc()
			}
		}
	)

	// 获取疫苗树形数据
	const getVaccinumTreeFunc = async function () {
		if (vaccinumTreeList.value.length <= 0) {
			const res = await getVaccinumTree(1)
			if (!res) return
			vaccinumTreeList.value = res.data || []
			vaccinumTreeList.value.forEach(item => {
				item.id = item.vaccineCategory
				item.vaccineName = item.categoryVaccineName
			})
		}
	}

	// 获取疫苗库存
	const getVaccinumStock = async function (data) {
		if (dialogType.value == 1) { // 登记
			const params = {
				id: archiveBaseInfo.value.id,
				vaccinableIds: data.join(',')
			}
			const res = await getVaccinumStockByVaccinableId(params)
			if (!res || !res.data) return
				res.data.forEach(item => {
					item.programParams = {
						vaccineCode: item.childProgram.vaccineCode,
						vaccinationSeq: item.childProgram.vaccinationSeq,
						vaccinationSiteCode: '01',
						typeVaccinationCode: '01',
						registeredDoctor: userStore.userInfo.nickName,
						stockId: item.stock[0]?.id || ''
					}
				registrationVaccinumList.value.push(item)
			})
		} else if (dialogType.value == 2) { // 自定义登记
			const params = {
				id: archiveBaseInfo.value.id,
				vaccineCode: data.vaccineCode
			}
			const res = await getVaccinumStockByVaccinumCode(params)
			if (!res || !res.data) return
			res.data.programParams = {
				vaccineCode: data.vaccineCode,
				vaccinationSeq: res.data.needleTimes,
				vaccinationSiteCode: '01',
				typeVaccinationCode: '01',
				registeredDoctor: userStore.userInfo.nickName,
				stockId: res.data.stock[0]?.id || ''
			}
			registrationVaccinumList.value.push(res.data)
		}
	}

	// 选择的疫苗改变时
	const handleSelectedVaccinumChange = function (value) {
		vaccinumTreeList.value.forEach(item => {
			if (item.id == value[0]) {
				item.subclassVaccines.forEach(vacc => {
					if (vacc.id == value[1]) {
						getVaccinumStock({
							vaccineCode: vacc.vaccineCode,
						})
					}
				})
			}
		})
		selectedVaccinumValue.value = []
	}

	// 点击确定
	const handleRegistrationVaccinumConfirm = async function () {
		const vaccinationRecords = registrationVaccinumList.value.map(item => {
			let findRes = item.stock.find(itm => itm.id == item.programParams.stockId)
			return {
				registeredDoctor: item.programParams.registeredDoctor,
				vaccinationSeq: item.programParams.vaccinationSeq,
				vaccinationSiteCode: item.programParams.vaccinationSiteCode,
				typeVaccinationCode: item.programParams.typeVaccinationCode,

				vaccineCode: findRes.vaccineCode,
				vaccineName: findRes.vaccineName,
				vaccinePropertyCode: findRes.vaccinePropertyCode,
				stockId: findRes.id,
				batchNumber: findRes.batchNumber,
				manufacturerId: findRes.manufactorId,
				vaccineManufacturerName: findRes.manufactorName,
				manufacturerCode: findRes.manufacturerCode,
				expiredDate: findRes.expiredDate,
				vacBuyingPrice: findRes.price,
			}
		})
		const data = {
			immunizationArchivesBaseId: archiveBaseInfo.value.id,
			patientName: archiveBaseInfo.value.patientName,
			vaccinationRecords: vaccinationRecords,
			sign: ''
		}
		console.log(data)
	}

	// 弹框彻底关闭
	const handleClosedDialog = function () {}
</script>

<template>
	<div class="component-container registration-vaccinum-dialog-component">
		<el-dialog
			class="registration-vaccinum-dialog"
			width="1200px"
			v-model="showDialog"
			:close-on-click-modal="false"
			:append-to-body="false"
			@closed="handleClosedDialog"
		>
			<template #header>
				<div class="dialog-title">
					<span class="title-text" v-if="dialogType == 1">登记</span>
					<span class="title-text" v-if="dialogType == 2">自定义登记</span>
				</div>
			</template>

			<div class="dialog-content">
				<div class="archive-info-box">
					<el-descriptions title="核对儿童信息" border :column="3">
						<el-descriptions-item
							label-class-name="description-item-label"
							class-name="description-item-value"
							label="姓名"
						>
							{{ archiveBaseInfo.patientName }}
						</el-descriptions-item>
						<el-descriptions-item
							label-class-name="description-item-label"
							class-name="description-item-value"
							label="证件类型"
						>
							{{ $selectDictLabel(cardTypeDict, archiveBaseInfo.idCardType) }}
						</el-descriptions-item>
						<el-descriptions-item
							label-class-name="description-item-label"
							class-name="description-item-value"
							label="联系电话"
						>
							{{
								archiveBaseInfo.motherTel ||
								archiveBaseInfo.fatherTel ||
								archiveBaseInfo.contactsMobileTel
							}}
						</el-descriptions-item>
						<el-descriptions-item
							label-class-name="description-item-label"
							class-name="description-item-value"
							label="出生日期"
						>
							{{ archiveBaseInfo.birthDate }}
						</el-descriptions-item>
						<el-descriptions-item
							label-class-name="description-item-label"
							class-name="description-item-value"
							label="证件号码"
						>
							{{ archiveBaseInfo.idCardNumber }}
						</el-descriptions-item>
						<el-descriptions-item
							label-class-name="description-item-label"
							class-name="description-item-value"
							label="母亲姓名"
						>
							{{ archiveBaseInfo.motherName }}
						</el-descriptions-item>
					</el-descriptions>
				</div>
				<div class="vaccinum-select-box" v-if="dialogType == 2">
					<el-cascader
						style="width: 300px;"
						ref="selectedVaccinumCascaderRef"
						v-model="selectedVaccinumValue"
						placeholder="请选择疫苗"
						:options="vaccinumTreeList"
						:props="{
							expandTrigger: 'hover',
							label: 'vaccineName',
							value: 'id',
							children: 'subclassVaccines',
						}"
						filterable
						clearable
						@change="handleSelectedVaccinumChange"
					></el-cascader>
				</div>
				<div class="registration-vaccinum-box">
					<div
						class="registration-vaccinum-item"
						v-for="(item, index) in registrationVaccinumList"
						:key="index"
					>
						<el-form :model="item.programParams" inline>
							<el-form-item label="疫苗名称：" label-width="90px">
                <span style="width: 600px;">{{ item.programParams.vaccineName }}</span>
              </el-form-item>
							<el-form-item label="登记医生：">
                <span>{{ item.programParams.registeredDoctor }}</span>
              </el-form-item>
							<br />
							<el-form-item
								label="接种部位："
								:rules="[{ required: true, message: '请选择接种部位', trigger: 'change' }]"
							>
                <el-select
									style="width: 200px;"
									v-model="item.programParams.vaccinationSiteCode"
									placeholder="请选择"
								>
									<el-option
										v-for="dict in inoculationSiteDict"
										:key="dict.value"
										:label="dict.label"
										:value="dict.value"
									></el-option>
								</el-select>
              </el-form-item>
							<el-form-item
								label="接种类型："
								label-width="200px"
								:rules="[{ required: true, message: '请选择接种类型', trigger: 'change' }]"
							>
                <el-select
									style="width: 200px;"
									v-model="item.programParams.typeVaccinationCode"
									placeholder="请选择"
								>
									<el-option
										v-for="dict in inoculationTypeDict"
										:key="dict.value"
										:label="dict.label"
										:value="dict.value"
									></el-option>
								</el-select>
              </el-form-item>
						</el-form>
						<el-table
							:data="item.stock"
							:highlight-current-row="true"
							:header-cell-style="{
								height: '35px',
								background: '#F8F8F9',
								padding: '0 0',
							}"
							@current-change="(currentRow) => item.programParams.stockId = currentRow.id"
						>
							<el-table-column align="center" width="40" type="index">
								<template #default="scope">
									<el-radio v-model="item.programParams.stockId" :label="scope.row.id">
										<template #default><span></span></template>
									</el-radio>
								</template>
							</el-table-column>
							<el-table-column
								prop="vaccineName"
								label="疫苗名称"
								align="center"
								min-width="200"
							></el-table-column>
							<el-table-column
								prop="vaccinePropertyCode"
								label="疫苗属性"
								align="center"
								min-width="150"
							>
								<template #default="scope">
									<el-tag type="success" v-if="scope.row.vaccinePropertyCode == '01'">
										{{ $selectDictLabel(vaccinePropertyDict, scope.row.vaccinePropertyCode) }}
									</el-tag>
									<el-tag v-else>
										{{ $selectDictLabel(vaccinePropertyDict, scope.row.vaccinePropertyCode) }}
									</el-tag>
								</template>
							</el-table-column>
							<el-table-column
								prop="prepnSpec"
								label="剂量/规格"
								align="center"
								min-width="160"
							>
								<template #default="scope">
									<span>{{ scope.row.prepnSpec }}/{{ scope.row.pkgSpecCrit }}</span>
								</template>
							</el-table-column>
							<el-table-column
								label="厂商"
								prop="manufactorName"
								align="center"
								min-width="120"
							></el-table-column>
							<el-table-column
								prop="batchNumber"
								label="批号"
								align="center"
								min-width="120"
							></el-table-column>
							<el-table-column
								prop="expiredDate"
								label="疫苗效期"
								align="center"
								min-width="100"
							></el-table-column>
							<el-table-column
								prop="price"
								label="价格"
								align="center"
								min-width="60"
							>
								<template #default="scope">
									<span>{{ Number(scope.row.price).toFixed(2) }}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="quantity"
								label="库存"
								align="center"
								min-width="60"
							></el-table-column>
						</el-table>
						<el-button
							class="delete-btn"
							type="danger"
							@click="registrationVaccinumList.splice(index, 1)"
							v-if="dialogType == 2"
						>删除</el-button>
					</div>
				</div>
				<div class="signature-box" v-if="showSignature">
					<div class="signature-tip">知情通知书签名：</div>
					<img class="signature-img" :src="signatureNameBase64" v-if="signatureNameBase64" />
				</div>
			</div>

			<template #footer>
				<div class="dialog-footer">
					<el-button
						type="success"
						v-if="false"
					>电子签名</el-button>
					<el-button
						type="primary"
						icon="CircleCheck"
						:loading="btnLoading"
						@click="handleRegistrationVaccinumConfirm"
					>确 定</el-button>
					<el-button
						icon="CircleClose"
						@click="showDialog = false"
					>取 消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss">
.registration-vaccinum-dialog-component {
	:deep(.registration-vaccinum-dialog) {
		background: #ebeff7;
		.dialog-title {
			.title-text {
				font-size: 18px;
			}
		}
		.dialog-content {
			.archive-info-box {
				background: #fff;
				border-radius: 5px;
				padding: 15px 15px;
				.description-item-label {
					width: 120px;
				}
				.description-item-value {
					min-width: 250px;
				}
			}
			.vaccinum-select-box {
				margin-top: 10px;
			}
			.registration-vaccinum-box {
				margin-top: 10px;
				.registration-vaccinum-item {
					background: #fff;
					border-radius: 5px;
					padding: 15px 15px;
					position: relative;
					.delete-btn {
						position: absolute;
						right: 20px;
						top: 20px;
					}
				}
				.registration-vaccinum-item + .registration-vaccinum-item {
					margin-top: 10px;
				}
			}
			.signature-box {
				min-height: 200px;
				margin-top: 10px;
				background: #fff;
				border-radius: 5px;
				padding: 15px 15px;
				position: relative;
				.signature-tip {
					font-family: "YouSheBiaoTiHei";
					position: absolute;
					right: 100px;
					top: 30px;
					font-size: 16px;
					font-style: italic;
					font-weight: 600;
				}
				.signature-img {
					width: 150px;
					height: 60px;
					position: absolute;
					right: 100px;
					top: 50px;
				}
			}
		}
		.dialog-footer {
			text-align: center;
		}
	}
}
</style>
