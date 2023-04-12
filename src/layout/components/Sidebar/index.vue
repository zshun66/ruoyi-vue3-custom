<!--
 * @Author: zhoushun 229591451@qq.com
 * @Date: 2023-04-03 16:22:42
 * @LastEditors: zhoushun 229591451@qq.com
 * @LastEditTime: 2023-04-12 11:19:07
 * @FilePath: \ruoyi-ui\src\layout\components\Sidebar\index.vue
 * @Description:
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div
		class="sidebar-container"
    :class="{ 'has-logo': showLogo }"
    :style="sidebarContainerStyle"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuBgColor"
        :text-color="menuTextColor"
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: {
		SidebarItem,
		Logo
	},
	methods: {

	},
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['sidebarRouters', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
		sidebarContainerStyle() {
			return {
				backgroundColor:
					this.settings.sideTheme === 'theme-dark' ?
					variables.menuDarkBackground :
					variables.menuLightBackground,
			}
		},
		menuBgColor() {
			return this.settings.sideTheme === 'theme-dark' ?
						variables.menuDarkBackground :
						variables.menuLightBackground
		},
		menuTextColor() {
			return this.settings.sideTheme === 'theme-dark' ?
						variables.menuColor :
						variables.menuLightColor
		},
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
}
</script>

<style scoped lang="scss">

</style>
