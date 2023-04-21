<template>
	<div class="component-container archive-base-info-component">
		<div class="card-title">
			<span class="title">登记人信息</span>
		</div>
		<div class="card-body">
			<div class="info-col">
				<div class="info-item">
					<span class="label">编码</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.archiveCode }}</span>
				</div>
				<div class="info-item">
					<span class="label">母亲姓名</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.motherName }}</span>
				</div>
				<div class="info-item">
					<span class="label">接种禁忌</span>
					<span class="colon">:</span>
					<span class="value text-red">{{ $selectDictLabel(hasNotDict, c_archiveBaseInfo.vaccinationTabooSign) }}</span>
				</div>
			</div>

			<div class="info-col">
				<div class="info-item">
					<span class="label">姓名</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.patientName }}</span>
				</div>
				<div class="info-item">
					<span class="label">母亲联系方式</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.motherTel }}</span>
				</div>
				<div class="info-item">
					<span class="label">免疫缺陷</span>
					<span class="colon">:</span>
					<span class="value text-red">{{ $selectDictLabel(hasNotDict, c_archiveBaseInfo.immuneDeficiencySign) }}</span>
				</div>
			</div>

			<div class="info-col">
				<div class="info-item sex" :class="[c_archiveBaseInfo.sex == '1' ? 'male' : 'female']">
					<span class="label">性别</span>
					<span class="colon">:</span>
					<div class="value">
						<img class="sex-icon" src="@/assets/svg/boy.svg" v-if="c_archiveBaseInfo.sex == '1'">
						<img class="sex-icon" src="@/assets/svg/girl.svg" v-if="c_archiveBaseInfo.sex == '2'">
						<span>{{ $selectDictLabel(sexDict, c_archiveBaseInfo.sex) }}</span>
					</div>
				</div>
				<div class="info-item">
					<span class="label">父亲姓名</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.fatherName }}</span>
				</div>
				<div class="info-item">
					<span class="label">个案状态</span>
					<span class="colon">:</span>
					<span class="value" :class="{ 'text-red': c_archiveBaseInfo.archiveState !== '1' }">
						{{ $selectDictLabel(archiveStatusDict, c_archiveBaseInfo.archiveState) }}
					</span>
				</div>
			</div>

			<div class="info-col">
				<div class="info-item">
					<span class="label">出生日期</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.birthDate }}</span>
				</div>
				<div class="info-item">
					<span class="label">父亲联系方式</span>
					<span class="colon">:</span>
					<span class="value">{{ c_archiveBaseInfo.fatherTel }}</span>
				</div>
				<div class="info-item">
					<span class="label">备注</span>
					<span class="colon">:</span>
					<span class="value text-red">{{ c_archiveBaseInfo.remark }}</span>
				</div>
			</div>
			<div class="info-col">
				<div class="info-item">
					<span class="label">年龄</span>
					<span class="colon">:</span>
					<span class="value">{{ $formatTimeToAgeYM(c_archiveBaseInfo.birthDate) }}</span>
				</div>
				<div class="info-item write" :class="{ active: c_archiveBaseInfo.id }">
					<span class="label"><i class="el-icon-edit"></i>记一笔</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArchiveBaseInfo',
	dicts: [],
	components: {},
	props: {},
	inject: {
		archiveBaseInfo: {
			default: () => {}
		},
		sexDict: {
			default: () => []
		},
		hasNotDict: {
			default: () => []
		},
		archiveStatusDict: {
			default: () => []
		}
	},
	data() {
		return {
		}
	},
	created() {
	},
	mounted() {},
	methods: {},
	computed: {
		c_archiveBaseInfo() {
			console.log('受种者基本信息', this.archiveBaseInfo())
			return this.archiveBaseInfo()
		}
	},
	watch: {},
}
</script>

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
		.title {
			color: #101010;
    	font-size: 16px;
    	font-weight: bold;
		}
	}
	.card-body {
		padding: 25px 15px 0px;
		display: flex;
		.info-col {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			.info-item {
				height: 45px;
				display: flex;
				.label {
					min-width: 65px;
					font-size: 16px;
					font-weight: 700;
					color: #2c3e50;
					text-align-last: justify;
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
			.info-item.write.active {
				cursor: pointer;
				color: #2196f3;
			}
		}
		.info-col:nth-child(1) {
			min-width: 200px;
			max-width: 280px;
		}
		.info-col:nth-child(2) {
			min-width: 200px;
			max-width: 220px;
			margin-left: 10px;
		}
		.info-col:nth-child(3) {
			min-width: 180px;
			max-width: 200px;
			margin-left: 10px;
		}
		.info-col:nth-child(4) {
			min-width: 200px;
			max-width: 250px;
			margin-left: 10px;
		}
		.info-col:nth-child(5) {
			width: 150px;
			margin-left: 10px;
			justify-content: space-between;
		}
	}
}
</style>
