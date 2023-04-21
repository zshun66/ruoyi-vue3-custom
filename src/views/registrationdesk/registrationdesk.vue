<!--
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-21 11:35:02
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 18:56:40
 * @FilePath: \ruoyi-ui\src\views\registrationdesk\registrationdesk.vue
 * @Description: 登记台
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
	<div class="page-container registrationdesk-page">
		<div class="top-wrapper">
			<TopHeader />
		</div>
		<div class="bottom-wrapper">
			<div class="archive-base-info-wrapper">
				<ArchiveBaseInfo />
			</div>
		</div>
	</div>
</template>

<script>
import TopHeader from './components/TopHeader/TopHeader.vue'
import ArchiveBaseInfo from './components/ArchiveBaseInfo/ArchiveBaseInfo.vue'

export default {
	name: 'registrationdesk',
	dicts: [
		'sys_user_sex',
		'other_diseases',
		'wv_archives_status'
	],
	components: {
		TopHeader,
		ArchiveBaseInfo,
	},
	props: {},
	provide() {
		return {
			archiveBaseInfo: () => this.archiveBaseInfo,
			sexDict: this.dict.type.sys_user_sex,
			hasNotDict: this.dict.type.other_diseases,
			archiveStatusDict: this.dict.type.wv_archives_status
		}
	},
	data() {
		return {
			// 档案基本信息
			archiveBaseInfo: {
				archiveCode: '36011100605319980808',
				motherTel: '13755609011',
				birthDate: '1998-07-07 00:00:00',
				sex: '1',
				motherName: '的方法',
				fatherName: '是否分',
				vaccinationTabooSign: '1',
				immuneDeficiencySign: '1',
				archiveState: '1',
				fatherTel: '13755609011',
				remark: '三大发放',
			}
		}
	},
	created() {
	},
	mounted() {},
	methods: {},
	computed: {},
	watch: {},
}
</script>

<style scoped lang="scss">
.registrationdesk-page {
	height: 100%;
	padding: 0 0;
	background: #F0FFFE;
	display: flex;
	flex-direction: column;
	.top-wrapper {
	}
	.bottom-wrapper {
		height: 100%;
		padding: 10px 10px;
		.archive-base-info-wrapper {
			width: 70%;
			min-width: 1145px;
		}
	}
}
</style>
