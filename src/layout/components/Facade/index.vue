<template>
	<div class="facade-component">
		<div class="left-wrap">
			<div>
				<span>{{ $systemConfig.logoTitleZH }}</span>
			</div>
			<div></div>
			<div>{{ $systemConfig.logoTitleEN }}</div>
		</div>
		<div class="right-wrap">
			<search class="search-right-item" id="header-search" />
			<screenfull class="screenfull-right-item hover-effect" id="screenfull" />
			<div class="avatar-username" @click="$router.push('/user/profile')">
				<img class="avatar" :src="avatar" />
				<span class="username">{{ nickName }}({{ name }})</span>
			</div>
			<div class="logout-btn" @click="logout">退出</div>
		</div>
	</div>
</template>

<script setup name="Facade">
import Search from '@/components/HeaderSearch'
import Screenfull from '@/components/Screenfull'
import { ElMessageBox } from 'element-plus'

import useUserStore from '@/store/modules/user'

const route = useRoute()
const userStore = useUserStore()

const name = computed(() => userStore.name)
const nickName = computed(() => userStore.nickName)
const avatar = computed(() => userStore.avatar)

// 退出
const logout = async function () {
	let result = await ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).catch((action) => {})
	if (!result) return
	userStore.LogOut().then(() => {
		location.href = `/login?redirect=${route.fullPath}`
	})
}
</script>

<style scoped lang="scss">
.facade-component {
	width: 100%;
	height: 82px;
	background-image: url('@/assets/images/facadebg.png');
	background-repeat: no-repeat;
	background-size: cover;
	padding: 0 30px 0 35px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.left-wrap {
		width: 369px;
		color: #fff;
	}
	.left-wrap div:nth-child(1) {
		font-size: 25px;
		font-weight: bold;
		transform: scaleY(1.05);
		text-align: justify;
		text-align-last: justify;
	}
	.left-wrap div:nth-child(2) {
		height: 6px;
		margin: 3px 0;
		background-color: #fff;
	}
	.left-wrap div:nth-child(3) {
		font-size: 13px;
		text-align: justify;
		text-align-last: justify;
		letter-spacing: 3px;
	}

	.right-wrap {
		display: flex;
		align-items: center;
		margin-bottom: -30px;
		.search-right-item {
			display: inline-block;
			padding: 0 10px;
			height: 100%;
			color: #5a5e66;
			vertical-align: text-bottom;
		}
		.screenfull-right-item {
			display: inline-block;
			padding: 0 10px;
			height: 100%;
			color: #5a5e66;
			vertical-align: text-bottom;
		}
		.avatar-username {
			display: flex;
			align-items: center;
			padding: 0 10px;
			cursor: pointer;
			.avatar {
				width: 22px;
				height: 22px;
				border-radius: 50%;
				margin-right: 10px;
			}
			.username {
				color: #4e5969;
				font-size: 18px;
			}
		}
		.logout-btn {
			display: inline-block;
			height: 100%;
			color: rgba(245, 108, 108, 1);
			font-size: 18px;
			vertical-align: text-bottom;
			cursor: pointer;
			padding: 0 10px;
		}
	}
}
</style>
