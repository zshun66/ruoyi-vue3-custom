<script setup name="IndividualCaseSyncDialog">
	import { getCurrDeptRegionDivide } from '@/api/common.js'

	const { proxy } = getCurrentInstance()

	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	const sexDict = inject('sexDict', () => [])
	const accountAttributeDict = inject('accountAttributeDict', () => [])

	// 是否显示弹框
	const showDialog = ref(false)
	// 个案同步表单
	const formData = ref({
		patientName: '',
		birthDate: '',
		sex: '',
		accountAttribute: '',
		motherName: '',
		motherIdCard: '',
		motherTel: '',
		regionCode: '',
		communityVillage: ''
	})
	// 个案同步表单规则
	const formRules = reactive({
		patientName: [
			{ required: true, message: '请输入儿童姓名', trigger: 'blur' }
		],
		birthDate: [
			{ required: true, message: '请选择出生日期', trigger: 'change' }
		],
		sex: [
			{ required: true, message: '请选择儿童性别', trigger: 'change' }
		],
		accountAttribute: [
			{ required: true, message: '请选择户口属性', trigger: 'change' }
		],
		motherName: [
			{ required: true, message: '请输入母亲姓名', trigger: 'blur' }
		],
		motherIdCard: [
			{ required: true, message: '请输入母亲证件号', trigger: 'blur' }
		],
		motherTel: [
			{ required: true, message: '请输入母亲手机号', trigger: 'blur' }
		],
		regionCode: [
			{ required: true, message: '请选择区域划分', trigger: 'change' }
		],
		communityVillage: [
			{ required: true, message: '请输入社区村', trigger: 'blur' }
		]
	})
	// 区域划分数据
	const regionDivideList = ref([])
	// 确认按钮是否加载中
	const	btnLoading = ref(false)


	// 监听弹框打开事件
	proxy.$mitt.on('on-openIndividualCaseSyncDialog', async () => {
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
	const handleIndividualCaseSyncConfirm = async function () {

	}
	// 弹框彻底关闭
	const handleClosedDialog = function () {

	}
</script>

<template>
	<div class="component-container individual-case-sync-dialog-component">
		<el-dialog
			class="individual-case-sync-dialog"
			width="650px"
			v-model="showDialog"
			:close-on-click-modal="false"
			:append-to-body="false"
			@closed="handleClosedDialog"
		>
			<template #header>
				<div class="dialog-title">
					<span class="title-text">个案同步</span>
					<span class="require-text">(*为必填项)</span>
				</div>
			</template>

			<div class="dialog-content">
				<el-form
					class="form-class"
					ref="caseSyncFormRef"
					inline
					:model="formData"
					:rules="formRules"
					label-width="100px"
				>
					<el-form-item label="儿童姓名" prop="patientName">
						<el-input
							style="width: 200px;"
							v-model="formData.patientName"
							placeholder="请输入儿童姓名"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item
						label="出生日期"
						prop="birthDate"
					>
						<CusElDatePicker
							style="width: 200px;"
							type="date"
							v-model="formData.birthDate"
							placeholder="请选择出生日期"
							disabled
							:disabled-date="(time) => {
								return time.getTime() > Date.now()
							}"
						></CusElDatePicker>
					</el-form-item>
					<el-form-item label="儿童性别" prop="sex">
						<el-select
							style="width: 200px;"
							v-model="formData.sex"
							placeholder="请选择儿童性别"
							clearable
						>
							<el-option
								v-for="dict in sexDict"
								:key="dict.value"
								:label="dict.label"
								:value="dict.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="户口属性" prop="accountAttribute">
						<el-select
							style="width: 200px;"
							v-model="formData.accountAttribute"
							placeholder="请选择户口属性"
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
					<el-form-item label="母亲姓名" prop="motherName">
						<el-input
							style="width: 200px;"
							v-model="formData.motherName"
							placeholder="请输入母亲姓名"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="母亲证件号" prop="motherIdCard">
						<el-input
							style="width: 200px;"
							v-model="formData.motherIdCard"
							placeholder="请输入母亲证件号"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="母亲手机号" prop="motherTel">
						<el-input
							style="width: 200px;"
							v-model="formData.motherTel"
							placeholder="请输入母亲手机号"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="区域划分" prop="regionCode">
						<el-select
							style="width: 200px;"
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
					<el-form-item label="社区村" prop="communityVillage">
						<el-input
							style="width: 200px;"
							v-model="formData.communityVillage"
							placeholder="请输入社区村"
							clearable
						></el-input>
					</el-form-item>
				</el-form>
			</div>

			<template #footer>
				<div class="dialog-footer">
					<el-button
						type="primary"
						icon="CircleCheck"
						:loading="btnLoading"
						@click="handleIndividualCaseSyncConfirm"
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
.individual-case-sync-dialog-component {
	:deep(.individual-case-sync-dialog) {
		background: #EBEFF7;
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
			padding: 10px 0 0 0;
		}
		.dialog-footer {
			text-align: center;
		}
	}
}
</style>
