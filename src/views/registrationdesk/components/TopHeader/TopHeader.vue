<script setup name="TopHeader">
	const { proxy } = getCurrentInstance()
	const router = useRouter()
	const emits = defineEmits(['on-search'])

	// 档案基本信息
	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	// 搜索输入框内容
	const searchInputContent = ref('36011100605319980808') // 362201199807072833 36011100605319980808

	// 确认搜索
	const handleConfirmSearch = function () {
		if (!searchInputContent.value) {
			return proxy.$message.warning('请先输入档案编码或身份证号进行查询')
		}
		emits('on-search', searchInputContent.value)
	}
	// 新增档案
	const handleNewAddArchive = function () {
		proxy.$mitt.emit('on-openSelectBirthDateDialog')
		proxy.$mitt.emit('on-openEditChildArchiveDialog', { dialogType: 1 })
	}
	// 临时接种
	const handleTemporaryInoculate = function () {

	}
	// 登记异常
	const handleRegistrationAbnormal = function () {

	}
	// 退出登记台
	const handleExit = function () {
		router.push('/index')
	}
</script>

<template>
	<div class="component-container topheader-component">
		<div class="left-wrap">
			<el-input
				class="search-input"
				type="text"
				v-model.trim="searchInputContent"
				placeholder="请输入档案编码或身份证号"
				clearable
				@keyup.enter="handleConfirmSearch"
			></el-input>

			<div class="btns-wrap">
				<div class="op-btn" @click="handleNewAddArchive">
					<el-icon size="15px" color="#00C3B7"><DocumentAdd /></el-icon>
					<span class="btn-text">档案新增</span>
				</div>
				<div class="op-btn" @click="handleTemporaryInoculate">
					<svg-icon class="btn-icon" icon-class="needle" style="transform: scaleX(-1);" />
					<span class="btn-text">临时接种</span>
				</div>
				<div class="op-btn" @click="handleRegistrationAbnormal" v-if="archiveBaseInfo.id">
					<el-icon size="15px" color="#f00"><Edit /></el-icon>
					<span class="btn-text" style="color: #f00;">登记异常</span>
				</div>
			</div>
		</div>
		<div class="right-wrap">
			<div class="exit-btn" @click="handleExit">
				<span>退出登记台</span>
				<svg-icon icon-class="exit"></svg-icon>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.topheader-component {
	width: 100%;
	height: 60px;
	padding: 0 10px;
	background: #00C7BA;
	display: flex;
	align-items: center;
	.left-wrap {
		display: flex;
		align-items: center;
		:deep(.search-input) {
			width: 300px;
		}
		:deep(.search-input .el-input__wrapper) {
			font-size: 15px;
			border-radius: 100px;
			background: rgba(255, 255, 255, 0.7);
			box-shadow: none;
			padding: 0px 15px;
		}
		:deep(.search-input .el-input__wrapper input) {
			height: 36px;
			color: #333;
		}
		:deep(.search-input .el-input__wrapper input::placeholder) {
			color: #333;
		}

		.btns-wrap {
			display: flex;
			align-items: center;
			margin-left: 15px;
			.op-btn {
				height: 36px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #fff;
				box-shadow: 0 1px 5px 2px rgb(0 0 0 / 20%);
				color: #000;
				font-size: 14px;
				border-radius: 4px;
				padding: 0 20px;
				cursor: pointer;
				.btn-icon {
					color: #00C3B7;
					fill: #00C3B7;
					font-size: 16px;
				}
				.btn-text {
					margin-left: 5px;
				}
			}
			.op-btn + .op-btn {
				margin-left: 15px;
			}
		}
	}
	.right-wrap {
		margin-left: auto;
		display: flex;
		align-items: center;
		.exit-btn {
			margin-left: 15px;
			height: 36px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #E84444;
      color: #E84444;
      padding: 0px 20px;
      border-radius: 200px;
      background: #fff;
			white-space: nowrap;
			cursor: pointer;
		}
	}
}
</style>
