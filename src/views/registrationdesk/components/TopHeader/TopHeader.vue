<template>
	<div class="component-container topheader-component">
		<div class="left-wrap">
			<el-input
				class="search-input"
				type="text"
				v-model.trim="searchInputContent"
				placeholder="请输入档案编码或身份证号"
				clearable
				size="medium"
				@keyup.enter.native="handleConfirmSearch"
			></el-input>

			<div class="btns-wrap">
				<div class="op-btn" @click="handleNewAddArchive">
					<i class="btn-icon el-icon-document"></i>
					<span class="btn-text">档案新增</span>
				</div>
				<div class="op-btn" @click="handleTemporaryInoculate">
					<svg-icon class="btn-icon" icon-class="needle" style="transform: scaleX(-1);" />
					<span class="btn-text">临时接种</span>
				</div>
				<div class="op-btn" @click="handleRegistrationAbnormal">
					<i class="btn-icon el-icon-edit-outline" style="color: #f00;"></i>
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

<script>
export default {
	name: 'TopHeader',
	dicts: [],
	components: {},
	props: {},
	data() {
		return {
			// 搜索输入框内容
			searchInputContent: '',
		}
	},
	created() {},
	mounted() {},
	methods: {
		// 确认搜索
		handleConfirmSearch() {
			console.log(this.searchInputContent)
		},
		// 新增档案
		handleNewAddArchive() {

		},
		// 临时接种
		handleTemporaryInoculate() {

		},
		// 登记异常
		handleRegistrationAbnormal() {

		},
		// 退出登记台
		handleExit() {
			this.$router.push('/')
		}
	},
	computed: {},
	watch: {},
}
</script>

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
		::v-deep .search-input {
			width: 300px;
		}
		::v-deep .search-input input {
			font-size: 14px;
			border-radius: 100px;
			background: rgba(255, 255, 255, 0.7);
			border: none;
			color: #333;
		}
		::v-deep .search-input input::placeholder {
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
					fill: #00C3B7;
					color: #00C3B7;
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
