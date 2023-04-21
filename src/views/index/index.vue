<!--
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-14 13:51:52
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 11:13:15
 * @FilePath: \ruoyi-ui\src\views\index\index.vue
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
	<div class="page-container home-page">
		<div class="overall-overview-wrapper">
			<OverallOverview />
		</div>
		<div class="functions-entry-wrapper">
			<FunctionsEntry />
		</div>
	</div>
</template>

<script>
import OverallOverview from './components/OverallOverview/OverallOverview.vue'
import FunctionsEntry from './components/FunctionsEntry/FunctionsEntry.vue'

export default {
	name: 'index',
	dicts: [],
	components: {
		OverallOverview,
		FunctionsEntry,
	},
	props: {},
	data() {
		return {
		}
	},
	created() {},
	mounted() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>

<style scoped lang="scss">
.home-page {
	height: 100%;
	background: #00C7BA;
	display: flex;
	flex-direction: column;
	.functions-entry-wrapper {
		height: 100%;
		margin-top: 10px;
	}
}
</style>
