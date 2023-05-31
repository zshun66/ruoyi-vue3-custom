<script setup name="Vaccinable">
	const { proxy } = getCurrentInstance()

	const archiveBaseInfo = inject('archiveBaseInfo', () => {})
	const vaccinableList = inject('vaccinableList', () => [])
	const timeUnitDict = inject('timeUnitDict', () => [])

	const vaccinableTable = ref(null)

	// 选择的疫苗
	const selectionVaccinum = ref([])

	// 表格的选择项发生变化时
	const handleSelectionChange = function (selection) {
		selectionVaccinum.value = selection
	}
	// 点击表格行时触发
	const handleRowClick = function (row, column, event) {
		if (row.stock <= 0) return
		vaccinableTable.toggleRowSelection(row)
	}
	// 登记
	const handleRegistration = function () {
		proxy.$mitt.emit('on-openRegistrationVaccinumDialog', { dialogType: 1 })
	}
	// 自定义登记
	const handleCustomizeRegistration = function () {
		proxy.$mitt.emit('on-openRegistrationVaccinumDialog', { dialogType: 2, vaccinableIds: ['1633657768187830273', '1633656885035180034'] })
	}
</script>

<template>
	<div class="component-container vaccinable-component">
		<div class="card-title">
			<div class="left-box">
				<span class="title">可接种疫苗</span>
			</div>
			<div class="right-box" v-if="archiveBaseInfo.id">
				<el-button
					type="primary"
					plain
					@click="handleCustomizeRegistration"
				>自定义登记</el-button>
				<el-button
					type="primary"
					@click="handleRegistration"
					v-if="vaccinableList.length > 0"
				>登记</el-button>
			</div>
		</div>
		<div class="card-body">
			<el-table
				class="vaccinable-table"
				ref="vaccinableTable"
				height="100%"
				:header-cell-style="{
					padding: '0px 0px',
					fontSize: '15px',
				}"
				:cell-style="{
					padding: '0px 0px',
					height: '40px',
					fontSize: '16px',
				}"
				:data="vaccinableList"
				@selection-change="handleSelectionChange"
				@row-click="handleRowClick"
			>
				<el-table-column
					width="50"
					type="selection"
					align="center"
					:selectable="(row, index) => row.stock > 0"
				></el-table-column>
				<el-table-column
					min-width="170"
					label="疫苗名称"
					prop="vaccineShort"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					min-width="60"
					label="针次"
					prop="vaccinationSeq"
					align="center"
				>
					<template #default="scope">
						<span v-if="scope.row.vaccinationSeq == 0">免疫蛋白</span>
						<span class="needle-circle">{{ scope.row.vaccinationSeq }}</span>
					</template>
				</el-table-column>
				<el-table-column
					min-width="85"
					label="接种月龄"
					prop="birthInterval"
					align="center"
				>
					<template #default="scope">
						<span>{{ scope.row.birthInterval }}</span>
						<span>{{ $selectDictLabel(timeUnitDict, scope.row.birthIntervalUnit) }}</span>
					</template>
				</el-table-column>
				<el-table-column
					min-width="70"
					label="收费"
					align="center"
				>
					<template #default="scope">
						<el-tag class="price-tag" v-if="scope.row.vaccinePropertyCode != 4">免费</el-tag>
						<el-tag class="price-tag" v-else type="warning">自费</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					min-width="60"
					label="库存"
					prop="stock"
					align="center"
				></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
.vaccinable-component {
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
		}
	}
	.card-body {
		height: calc(100% - 45px);
		.vaccinable-table {
			width: 100%;
			:deep(.el-checkbox.is-disabled) {
				display: none;
			}
			.price-tag {
				font-size: 14px;
			}
		}
	}
}
</style>
