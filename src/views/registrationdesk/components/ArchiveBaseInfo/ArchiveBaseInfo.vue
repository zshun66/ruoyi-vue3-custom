<script setup name="ArchiveBaseInfo">
	const { proxy } = getCurrentInstance()

	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	const sexDict = inject('sexDict', () => [])
	const hasNotDict = inject('hasNotDict', () => [])
	const archiveStatusDict = inject('archiveStatusDict', () => [])

	// 记一笔
	const handleWriteOneNote = function () {
		if (!archiveBaseInfo.value.id) return
	}

	// 点击个案同步
	const handleClickIndividualCaseSync = function () {
		proxy.$mitt.emit('on-openIndividualCaseSyncDialog', {})
	}
</script>

<template>
	<div class="component-container archive-base-info-component">
		<div class="card-title">
			<div class="left-box">
				<span class="title">登记人信息</span>
				<el-tag
					class="obersve-status-tag"
					type="success"
					v-if="archiveBaseInfo.lastObservationState && archiveBaseInfo.lastObservationState == '1'"
				>上次已留观</el-tag>
				<el-tag
					class="obersve-status-tag"
					type="danger"
					v-if="archiveBaseInfo.lastObservationState && archiveBaseInfo.lastObservationState !== '1'"
				>上次未留观</el-tag>
			</div>
			<div class="right-box">
				<el-tooltip effect="dark" content="个案同步" placement="top">
					<el-icon class="icon-item" color="#21C2A5" size="24px" v-show="archiveBaseInfo.id" @click="handleClickIndividualCaseSync"><Refresh /></el-icon>
				</el-tooltip>
				<el-tooltip effect="dark" content="预检问诊" placement="top">
					<el-icon class="icon-item" color="#21C2A5" size="24px" v-show="archiveBaseInfo.id"><User /></el-icon>
				</el-tooltip>
				<el-tooltip effect="dark" content="预约记录" placement="top">
					<svg-icon class="icon-item brd-icon" icon-class="book-record" v-show="archiveBaseInfo.id" />
				</el-tooltip>
				<el-tooltip class="icon-item" effect="dark" content="不良反应登记" placement="top">
					<el-icon class="icon-item" color="#f00" size="24px" v-show="archiveBaseInfo.id"><Warning /></el-icon>
				</el-tooltip>
				<el-tooltip class="icon-item" effect="dark" content="档案修改" placement="top">
					<el-icon class="icon-item" color="#21C2A5" size="24px" v-show="archiveBaseInfo.id"><Edit /></el-icon>
				</el-tooltip>
				<el-tooltip class="icon-item" effect="dark" content="打印档案" placement="top">
					<el-icon class="icon-item" color="#21C2A5" size="24px" v-show="archiveBaseInfo.id"><Printer /></el-icon>
				</el-tooltip>
				<el-tooltip class="icon-item" effect="dark" content="删除档案" placement="top">
					<el-icon class="icon-item" color="#f00" size="24px" v-show="archiveBaseInfo.id && archiveBaseInfo.archiveState == '1'"><Delete /></el-icon>
				</el-tooltip>
				<el-tooltip class="icon-item" effect="dark" content="恢复档案" placement="top">
					<svg-icon
						class="icon-item restore-icon"
						icon-class="restore-archive"
						v-show="archiveBaseInfo.id && archiveBaseInfo.archiveState == '4'"
					/>
				</el-tooltip>
			</div>
		</div>
		<div class="card-body">
			<div class="info-row">
				<div class="info-item">
					<span class="label">编码</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.archiveCode }}</span>
				</div>
				<div class="info-item">
					<span class="label">姓名</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.patientName }}</span>
				</div>
				<div class="info-item sex" :class="[archiveBaseInfo.sex == '1' ? 'male' : 'female']">
					<span class="label">性别</span>
					<span class="colon">:</span>
					<div class="value">
						<img class="sex-icon" src="@/assets/svg/boy.svg" v-if="archiveBaseInfo.sex == '1'">
						<img class="sex-icon" src="@/assets/svg/girl.svg" v-if="archiveBaseInfo.sex == '2'">
						<span>{{ $selectDictLabel(sexDict, archiveBaseInfo.sex) }}</span>
					</div>
				</div>
				<div class="info-item">
					<span class="label">出生日期</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.birthDate }}</span>
				</div>
				<div class="info-item">
					<span class="label">年龄</span>
					<span class="colon">:</span>
					<span class="value">{{ $formatTimeToAgeYM(archiveBaseInfo.birthDate) }}</span>
				</div>
			</div>
			<div class="info-row">
				<div class="info-item">
					<span class="label">母亲姓名</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.motherName }}</span>
				</div>
				<div class="info-item">
					<span class="label">母亲联系方式</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.motherTel || archiveBaseInfo.contactsMobileTel }}</span>
				</div>
				<div class="info-item">
					<span class="label">父亲姓名</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.fatherName }}</span>
				</div>
				<div class="info-item">
					<span class="label">父亲联系方式</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.fatherTel }}</span>
				</div>
			</div>
			<div class="info-row">
				<div class="info-item">
					<span class="label">接种禁忌</span>
					<span class="colon">:</span>
					<span class="value text-red">{{ $selectDictLabel(hasNotDict, archiveBaseInfo.vaccinationTabooSign) }}</span>
				</div>
				<div class="info-item">
					<span class="label">免疫缺陷</span>
					<span class="colon">:</span>
					<span class="value text-red">{{ $selectDictLabel(hasNotDict, archiveBaseInfo.immuneDeficiencySign) }}</span>
				</div>
				<div class="info-item">
					<span class="label">个案状态</span>
					<span class="colon">:</span>
					<span class="value" :class="{ 'text-red': archiveBaseInfo.archiveState !== '1' }">
						{{ $selectDictLabel(archiveStatusDict, archiveBaseInfo.archiveState) }}
					</span>
				</div>
				<div class="info-item">
					<span class="label">备注</span>
					<span class="colon">:</span>
					<span class="value text-red">{{ archiveBaseInfo.remark }}</span>
				</div>
				<div class="info-item write" :class="{ active: archiveBaseInfo.id }">
					<span class="label" @click="handleWriteOneNote"><i class="el-icon-edit"></i>记一笔</span>
				</div>
			</div>
			<div class="info-row">
				<div class="info-item live-address">
					<span class="label">家庭地址</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.currentAddrDetail }}</span>
				</div>
				<div class="info-item res-address">
					<span class="label">户籍地址</span>
					<span class="colon">:</span>
					<span class="value">{{ archiveBaseInfo.permanentAddrDetail }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.archive-base-info-component {
	width: 100%;
	border: 1px solid #00c7ba;
	border-radius: 13px;
	background: #fff;
	.card-title {
		height: 45px;
		padding: 0px 15px;
		border-bottom: 2px solid #00c7ba;
		display: flex;
		align-items: center;
		.left-box {
			display: flex;
			align-items: center;
			.title {
				color: #101010;
				font-size: 16px;
				font-weight: bold;
			}
			.obersve-status-tag {
				margin-left: 10px;
			}
		}
		.right-box {
			display: flex;
    	align-items: center;
			margin-left: auto;
			.icon-item {
				cursor: pointer;
			}
			.icon-item.brd-icon {
				fill: #21C2A5;
				font-size: 21px;
			}
			.icon-item.restore-icon {
				fill: #21C2A5;
				font-size: 22px;
			}
			.icon-item + .icon-item {
				margin-left: 15px;
			}
		}
	}
	.card-body {
		padding: 20px 15px 0px;
		display: flex;
		flex-direction: column;
		.info-row {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.info-item {
				height: 40px;
				display: flex;
				.label {
					min-width: 65px;
					font-size: 16px;
					font-weight: 700;
					color: #2c3e50;
					text-align-last: justify;
					white-space: nowrap;
				}
				.colon {
					font-weight: 700;
					color: #2c3e50;
					font-size: 16px;
				}
				.value {
					margin-left: 10px;
					font-weight: bold;
    			color: #2196f3;
					word-break: break-all;
					&.text-red {
						color: #f00;
					}
				}
			}
			.info-item.sex .value .sex-icon {
				width: 20px;
				height: 20px;
				margin-top: -1px;
			}
			.info-item.sex .value span {
				vertical-align: top;
				margin-left: 10px;
			}
			.info-item.sex.female .value span {
				color: #FB414C;
			}
			.info-item.write.active .label {
				cursor: pointer;
				color: #2196f3;
			}

			.info-item:nth-child(1) {
				width: 280px;
			}
			.info-item:nth-child(2) {
				width: 220px;
				margin-left: 10px;
			}
			.info-item:nth-child(3) {
				width: 150px;
				margin-left: 10px;
			}
			.info-item:nth-child(4) {
				width: 250px;
				margin-left: 10px;
			}
			.info-item:nth-child(5) {
				width: 155px;
				margin-left: 10px;
			}

			.info-item.live-address {
				width: 510px;
			}
			.info-item.res-address {
				width: 500px;
			}
		}
	}
}
</style>
