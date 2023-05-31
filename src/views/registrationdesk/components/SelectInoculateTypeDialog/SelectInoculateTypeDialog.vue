<script setup name="SelectInoculateTypeDialog">
	import { getCurrDeptRegionDivide } from '@/api/common.js'

	const { proxy } = getCurrentInstance()

	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	const sexDict = inject('sexDict', () => [])
	const resAttributeDict = inject('resAttributeDict', () => [])

	// 是否显示弹框
	const showDialog = ref(false)
	// 是否可选择异地接种
	const selectableOffsiteInoculate = ref(true)
	// 选择接种类型表单
	const formData = ref({
		inoculationType: 1,
		regionCode: '',
		resAttribute: ''
	})
	// 选择接种类型表单规则
	const formRules = reactive({
		inoculationType: [],
		regionCode: [
			{ required: true, message: '请选择区域划分', trigger: 'change' }
		],
		resAttribute: [
			{ required: true, message: '请选择户籍属性', trigger: 'change' }
		]
	})
	// 区域划分数据
	const regionDivideList = ref([])
	// 确认按钮是否加载中
	const	btnLoading = ref(false)


	// 监听弹框打开事件
	proxy.$mitt.on('on-openSelectInoculateTypeDialog', async ({ offsiteInoculate = true }) => {
		selectableOffsiteInoculate.value = offsiteInoculate
		showDialog.value = true
		getCurrDeptRegionDivideFunc()
	})

	// 获取当前登陆者单位的区域划分数据
	const getCurrDeptRegionDivideFunc = async function () {
		if (regionDivideList.value.length <= 0) {
			let res = await getCurrDeptRegionDivide()
			if (!res) return
			regionDivideList.value = res.data || []
		}
	}

	// 点击确定
	const handleInoculateTypeConfirm = async function () {

	}
	// 弹框彻底关闭
	const handleClosedDialog = function () {

	}
</script>

<template>
	<div class="component-container select-inoculate-type-dialog-component">
		<el-dialog
			class="select-inoculate-type-dialog"
			width="750px"
			v-model="showDialog"
			:close-on-click-modal="false"
			:append-to-body="false"
			@closed="handleClosedDialog"
		>
			<template #header>
				<div class="dialog-title">
					<span class="title-text">受种者接种类型选择</span>
				</div>
			</template>

			<div class="dialog-content">
				<div class="base-info-box">
					<div class="info-row">
						<div class="info-item">
							<span class="label">受种者姓名:</span>
							<span class="value">{{ archiveBaseInfo.patientName }}</span>
						</div>
						<div class="info-item">
							<span class="label">出生日期:</span>
							<span class="value">{{ $formatTime(archiveBaseInfo.birthDate) }}</span>
						</div>
						<div class="info-item">
							<span class="label">性别:</span>
							<span class="value">{{ $selectDictLabel(sexDict, archiveBaseInfo.sex) }}</span>
						</div>
					</div>
					<div class="info-row">
						<div class="info-item code">
							<span class="label">受种者编码:</span>
							<span class="value">{{ archiveBaseInfo.archiveCode }}</span>
						</div>
						<div class="info-item age">
							<span class="label">年龄:</span>
							<span class="value">{{ $formatTimeToAgeYM(archiveBaseInfo.birthDate) }}</span>
						</div>
					</div>
					<div class="info-row">
						<div class="info-item">
							<span class="label">母亲姓名:</span>
							<span class="value">{{ archiveBaseInfo.motherName }}</span>
						</div>
						<div class="info-item">
							<span class="label">父亲姓名:</span>
							<span class="value">{{ archiveBaseInfo.fatherName }}</span>
						</div>
						<div class="info-item">
							<span class="label">联系方式:</span>
							<span class="value">{{ archiveBaseInfo.motherTel || archiveBaseInfo.fatherTel || archiveBaseInfo.contactsMobileTel }}</span>
						</div>
					</div>
				</div>
				<div class="manage-dept-info">
					<div class="dept-info">
						<span>该受种者现管单位为 </span>
						<span class="blue-text">{{ archiveBaseInfo.manageDeptName }}</span>
					</div>
					<div class="select-text" v-if="selectableOffsiteInoculate">
						<span>请选择</span><span class="blue-text"> 迁入接种 </span>或<span class="blue-text"> 异地接种</span>
					</div>
					<div class="select-text" v-if="!selectableOffsiteInoculate">
						<span>请选择</span><span class="blue-text">迁入接种</span>
					</div>
				</div>
				<div class="form-wrap">
					<el-radio-group v-model="formData.inoculationType">
						<el-radio :label="1">迁入接种</el-radio>
						<el-radio :label="2" v-if="selectableOffsiteInoculate">异地接种</el-radio>
					</el-radio-group>
					<el-form
						class="form-class"
						ref="immInoFormRef"
						:model="formData"
						:rules="formRules"
						label-width="80px"
        		v-if="formData.inoculationType == 1"
					>
						<el-form-item label="区域划分" prop="regionCode">
							<el-select
								v-model="formData.regionCode"
								placeholder="区域划分"
								filterable
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
						<el-form-item label="户籍属性" prop="resAttribute">
							<el-select
								v-model="formData.resAttribute"
								placeholder="户籍属性"
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
					</el-form>
				</div>
			</div>

			<template #footer>
				<div class="dialog-footer">
					<el-button
						type="primary"
						icon="CircleCheck"
						:loading="btnLoading"
						@click="handleInoculateTypeConfirm"
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
.select-inoculate-type-dialog-component {
	:deep(.select-inoculate-type-dialog) {
		background: #EBEFF7;
		.dialog-title {
			.title-text {
				font-size: 18px;
			}
		}
		.dialog-content {
			background: #fff;
			border-radius: 8px;
    	padding: 10px;
			.base-info-box {
				padding: 0px 20px 10px;
				border-bottom: 1px solid #ddd;
				.info-row {
					display: flex;
					.info-item {
						font-size: 15px;
						line-height: 40px;
						color: #303133;
						.label {
							font-weight: 600;
						}
						.value {
							margin-left: 10px;
						}
					}
					.info-item:nth-child(1) {
						width: 35%;
					}
					.info-item:nth-child(2) {
						width: 35%;
					}
					.info-item:nth-child(3) {
						width: 30%;
					}
					.info-item.code {
						width: 70%;
					}
					.info-item.age {
						width: 30%;
					}
				}
			}
			.manage-dept-info {
				padding: 20px 20px 10px;
				font-size: 15px;
				color: #303133;
				.blue-text {
					color: #1890ff;
				}
				.dept-info {

				}
				.select-text {
					margin-top: 20px;
				}
			}
			.form-wrap {
				margin-top: 15px;
				padding: 0px 20px;
				font-size: 15px;
				color: #303133;
				.form-class {
					margin-top: 20px;
				}
			}
		}
		.dialog-footer {
			text-align: center;
		}
	}
}
</style>
