<script setup name="InoculationRecord">
	const { proxy } = getCurrentInstance()

	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	const inoculationRecord = inject('inoculationRecord', () => [])
	const inoculationStatusDict = inject('inoculationStatusDict', () => [])
	const inoculationSiteDict = inject('inoculationSiteDict', () => [])

	// 撤销登记
	const	handleRevokeRegistration = function () {

	}
</script>

<template>
	<div class="component-container inoculation-record-component">
		<div class="card-title">
			<div class="left-box">
				<span class="title">接种历史</span>
			</div>
			<div class="right-box" v-if="archiveBaseInfo.id">
				<div class="btn-item">
					<span>补录</span><i class="el-icon-document-add"></i>
				</div>
				<div class="btn-item">
					<span>批量补录</span><i class="el-icon-document-add"></i>
				</div>
				<div class="btn-item">
					<span>刷新针次</span><i class="el-icon-refresh-right"></i>
				</div>
				<div class="btn-item">
					<span>接种更新</span><i class="el-icon-refresh"></i>
				</div>
			</div>
		</div>
		<div class="card-body">
			<el-table
				class="inoculation-record-table"
				ref="inoculationRecordTable"
				height="100%"
				border
				:header-cell-style="{
					padding: '0px 0px',
					fontSize: '17px',
					fontWeight: '900',
					color: '#000',
					borderLeft: 'none',
					borderTop: 'none',
					borderRight: 'none',
				}"
				:cell-style="{
					height: '40px',
					fontSize: '17px',
					color: '#444'
				}"
				:data="inoculationRecord"
				:span-method="($event) => $mergeTableRow($event, inoculationRecord, 'categoryVaccineName')"
			>
				<el-table-column
					min-width="150"
					label="疫苗大类"
					prop="categoryVaccineName"
					align="center"
					show-overflow-tooltip
				>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.inoculationState == '1'">{{ scope.row.categoryVaccineName }}</el-tag>
						<el-tag type="danger" v-if="scope.row.inoculationState !== '1'">{{ scope.row.categoryVaccineName }}</el-tag>
          </template>
				</el-table-column>
				<el-table-column
					min-width="60"
					label="针次"
					prop="vaccinationSeq"
					align="center"
				>
					<template #default="scope">
						<span v-if="scope.row.vaccinationSeq == 0">免疫蛋白</span>
						<span class="needle-circle" v-else>{{ scope.row.vaccinationSeq }}</span>
					</template>
				</el-table-column>
				<el-table-column
					min-width="250"
					label="疫苗次类"
          prop="vaccineName"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
				<el-table-column
					min-width="100"
          label="生产企业"
          prop="vaccineManufacturerName"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
				<el-table-column
					min-width="125"
					label="疫苗批号"
          prop="batchNumber"
          align="center"
        ></el-table-column>
				<el-table-column
					min-width="70"
					label="收费"
					align="center"
				>
					<template #default="scope">
						<span>{{ scope.row.vaccinePropertyCode == '04' ? '付费' : '免费' }}</span>
					</template>
				</el-table-column>
				<el-table-column
					min-width="95"
          label="接种月龄"
          prop=""
          align="center"
        >
					<template #default="scope">
						<span style="font-weight: 900;">
							{{ $formatTimeToAgeYM(archiveBaseInfo.birthDate, scope.row.inoculationState == '2' ? scope.row.registeredDate : scope.row.vaccinationDate) }}
						</span>
					</template>
        </el-table-column>
				<el-table-column
					class-name="inoculation-date-td"
					min-width="170"
					label="接种日期"
					prop="vaccinationDate"
					align="center"
				>
          <template #default="scope">
						<svg-icon
							class="subscript-icon"
							icon-class="new-subscript"
							v-if="scope.row.vaccinationDate == archiveBaseInfo.lastInoculationDate"
						/>
            <span>{{ $formatTime(scope.row.vaccinationDate, 'YYYY-MM-DD HH:mm') }}</span>
          </template>
        </el-table-column>
				<el-table-column
					min-width="100"
          label="状态"
          prop="inoculationState"
          align="center"
        >
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.inoculationState == '1'">
							{{ $selectDictLabel(inoculationStatusDict, scope.row.inoculationState) }}
						</el-tag>
						<el-tag type="danger" v-else-if="scope.row.inoculationState == '2'">
							{{ $selectDictLabel(inoculationStatusDict, scope.row.inoculationState) }}
						</el-tag>
						<el-tag type="info" v-else>
							{{ $selectDictLabel(inoculationStatusDict, scope.row.inoculationState) }}
						</el-tag>
          </template>
        </el-table-column>
				<el-table-column
          align="center"
          prop="vaccinationSiteCode"
          label="接种部位"
          min-width="100"
        >
					<template #default="scope">
            <span>{{ $selectDictLabel(inoculationSiteDict, scope.row.vaccinationSiteCode) }}</span>
          </template>
        </el-table-column>
				<el-table-column
					min-width="170"
          label="接种单位"
          prop="vaccinationOrgName"
          align="center"
					show-overflow-tooltip
        >
					<template #default="scope">
            <span>{{ scope.row.deptAbbreviation || scope.row.vaccinationOrgName }}</span>
          </template>
        </el-table-column>
				<el-table-column
					min-width="95"
          label="接种医生"
          prop="vaccinationDoctor"
          align="center"
        ></el-table-column>
        <el-table-column
					width="100"
					label="操作"
					align="center"
				>
          <template #default="scope">
            <el-button type="primary" link @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="primary" link @click="handleEdit(scope.row)" style="margin-left: 5px;">修改</el-button>
            <el-button
							type="danger"
              link
              @click="handleRevokeRegistration(scope.row)"
							v-if="!scope.row.inoculationState || scope.row.inoculationState == '2'"
							style="margin-left: 5px;"
						>删除</el-button>
          </template>
        </el-table-column>
				<el-table-column
					width="80"
					align="center"
					v-if="$checkPermi(['registration:desk:remove'])"
				>
          <template #default="scope">
            <el-button
							v-hasPermi="['registration:desk:remove']"
              type="danger"
							size="small"
              @click="handleDeleteRecord(scope.row.id, scope.row.vaccinationDate)"
              v-if="scope.row.inoculationState && scope.row.inoculationState != '2' &&
							(new Date().toLocaleDateString() == new Date(scope.row.vaccinationDate).toLocaleDateString())"
						>删除</el-button>
          </template>
        </el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
.inoculation-record-component {
	width: 100%;
	height: 100%;
	border: 1px solid #00c7ba;
	border-radius: 13px;
	background: #fff;
	overflow: hidden;
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
		}
		.right-box {
			margin-left: auto;
			display: flex;
			align-items: center;
			.btn-item {
				color: #21C2A5;
				font-size: 18px;
				cursor: pointer;
				display: flex;
				align-items: center;
				span {

				}
				i {
					font-size: 20px;
					margin-top: 2px;
				}
			}
			.btn-item + .btn-item {
				margin-left: 20px;
			}
		}
	}
	.card-body {
		height: calc(100% - 45px);
		.inoculation-record-table {
			width: 100%;

			.inoculation-date-td {
				width: 100%;
    		height: 100%;
				position: relative;
				.subscript-icon {
					position: absolute;
					top: 0px;
					left: 0px;
					font-size: 35px;
   			 	fill: red;
				}
			}
		}
	}
}
</style>
