<!--
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-21 10:02:20
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 16:22:02
 * @FilePath: \ruoyi-ui\src\views\index\components\OverallOverview\OverallOverview.vue
 * @Description: 首页-总体一览
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
	<div class="component-container overall-overview-component">
		<div class="card-header">
			<span class="title">总体一览</span>
		</div>
		<div class="card-body">
			<div class="overview-item">
				<span class="label">线上预约人次</span>
				<span class="value">{{ overallOverviewData.appointmentNum || 0 }}</span>
			</div>
			<div class="overview-item">
				<span class="label">登记儿童人次</span>
				<span class="value">{{ overallOverviewData.childRegistrationNum || 0 }}</span>
			</div>
			<div class="overview-item">
				<span class="label">登记成人人次</span>
				<span class="value">{{ overallOverviewData.adultRegistrationNum || 0 }}</span>
			</div>
			<div class="overview-item">
				<span class="label">接种剂次数</span>
				<span class="value">{{ overallOverviewData.doseNum || 0 }}</span>
			</div>
			<div class="overview-item">
				<span class="label">疫苗消耗数</span>
				<span class="value">{{ overallOverviewData.vaccineConsumption || 0 }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { getOverallOverviewData } from '@/api/home'

export default {
	name: 'OverallOverview',
	dicts: [],
	components: {},
	props: {},
	data() {
		return {
			overallOverviewData: {}
		}
	},
	created() {
		this.getOverallOverviewData()
	},
	mounted() {},
	methods: {
		// 获取总体一览数据
		async getOverallOverviewData() {
			let res = await getOverallOverviewData()
			if (!res) return
			this.overallOverviewData = res.data || {}
		}
	},
	computed: {},
	watch: {},
}
</script>

<style scoped lang="scss">
.overall-overview-component {
	background: rgba(255, 255, 255, 0.85);
	border-radius: 12px;
	padding: 15px 15px;
	.card-header {
		display: flex;
		align-items: center;
		.title {
			color: #1890ff;
			font-size: 18px;
    	font-weight: bold;
		}
	}
	.card-body {
		margin-top: 20px;
		display: grid;
		grid-template-columns: auto auto auto auto auto;
		gap: 15px;
		.overview-item {
			padding: 30px 0px;
			border-radius: 14px;
    	background-color: rgba(255, 255, 255, 0.4);
			box-shadow: 0px 2px 12px 0px rgb(0 0 0 / 10%);
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			.label {
				color: #000;
   		 	font-size: 16px;
			}
			.value {
				margin-top: 20px;
				color: #1890ff;
				font-size: 36px;
			}
		}
	}
}
</style>
