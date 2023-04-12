<!--
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-04 09:56:17
 * @FilePath: \ruoyi-ui\src\App.vue
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div id="app">
    <router-view />
    <theme-picker />
  </div>
</template>

<script>
	import ThemePicker from '@/components/ThemePicker'

	export default {
		name: 'App',
		components: {
			ThemePicker
		},
		metaInfo() {
			return {
				title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
				titleTemplate: (title) => {
				  return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
				}
			}
		}
	}
</script>

<style scoped>
	#app .theme-picker {
		display: none;
	}
</style>
