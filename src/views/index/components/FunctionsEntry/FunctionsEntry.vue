<!--
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-21 10:02:20
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-21 16:04:48
 * @FilePath: \ruoyi-ui\src\views\index\components\FunctionsEntry\FunctionsEntry.vue
 * @Description: 首页-功能入口
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
	<div class="component-container functions-entry-component">
		<div class="function-entry-wrap">
			<div
				class="function-entry-item"
				v-for="(item, index) in functionsList"
				:key="index"
				@click="handleFunctionItem(item)"
			>
				<div class="function-icon-wrap" :style="{ background: item.iconBgColor }">
					<img class="function-icon" :src="item.icon" alt="">
        </div>
        <span class="function-text">{{ item.title }}</span>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'FunctionsEntry',
	dicts: [],
	components: {},
	props: {},
	data() {
		return {
			functionsList: [
				{
          title: '登记台',
          icon: require('@/assets/svg/djt.svg'),
          iconBgColor: '#008CFF',
          path: '/registrationdesk',
        },
        {
          title: '接种台',
          icon: require('@/assets/svg/jzt.svg'),
          iconBgColor: '#00FFEE',
          path: '/vaccinationStation',
        },
        {
          title: '预约接种',
          icon: require('@/assets/svg/yyjz.svg'),
          iconBgColor: '#26FF00',
          path: '/adultVaccinationStation',
        },
        {
          title: '产科接种管理',
          icon: require('@/assets/svg/ckjz.svg'),
          iconBgColor: '#FF0000',
          path: '/obstetricvaccination',
        },
        {
          title: '接种查验',
          icon: require('@/assets/svg/jzcy.svg'),
          iconBgColor: '#FFAA00',
          path: '/checkInoculate',
        },
			]
		}
	},
	created() {
	},
	mounted() {},
	methods: {
		handleFunctionItem(item) {
			this.$router.push(item.path)
		}
	},
	computed: {},
	watch: {},
}
</script>

<style scoped lang="scss">
.functions-entry-component {
	height: 100%;
	background: rgba(255, 255, 255, 0.85);
	border-radius: 12px;
	padding: 15px 15px;
	display: flex;
	align-items: center;
	.function-entry-wrap {
		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		gap: 30px;
		.function-entry-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 400px;
			background-color: rgba(255, 255, 255, 0.4);
    	border-radius: 20px;
			box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 10%);
			cursor: pointer;
			transition: transform 0.3s;
			&:hover {
				background-color: #fff;
   		 	transform: translateY(-10px);
    		color: #1890ff;
			}
			.function-icon-wrap {
				width: 120px;
				height: 120px;
				border-radius: 200px;
				display: flex;
				align-items: center;
				justify-content: center;
				.function-icon {
					font-size: 80px;
					margin-top: 10px;
				}
			}
			.function-text {
				margin-top: 30px;
    		font-size: 28px;
			}
		}
	}
}
</style>
