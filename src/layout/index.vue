<template>
  <div
		class="app-wrapper"
		:class="classObj"
    :style="{ '--current-color': theme }"
  >
		<Facade />
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div
			class="main-container"
      :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }"
    >
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- <navbar @setLayout="setLayout" /> -->
        <!-- <tags-view v-if="needTagsView" /> -->
				<div class="tags-view-wrap">
					<hamburger
						id="hamburger-container"
						class="hamburger-container"
						:is-active="sidebar.opened"
						@toggleClick="toggleSideBar"
					/>
					<tags-view v-if="needTagsView" />
				</div>
      </div>
      <app-main />
      <settings ref="settingRef" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index.vue'
import { Facade, AppMain, Navbar, Settings, TagsView } from './components'
import Hamburger from '@/components/Hamburger'
import { useWindowSize } from '@vueuse/core'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const sidebar = computed(() => appStore.sidebar)
const device = computed(() => appStore.device)

const theme = computed(() => settingsStore.theme)
const needTagsView = computed(() => settingsStore.tagsView)
const fixedHeader = computed(() => settingsStore.fixedHeader)

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile',
}))

const { width, height } = useWindowSize()
const WIDTH = 992

watchEffect(() => {
  if (device.value === 'mobile' && sidebar.value.opened) {
    useAppStore().closeSideBar({ withoutAnimation: false })
  }
  if (width.value - 1 < WIDTH) {
    useAppStore().toggleDevice('mobile')
    useAppStore().closeSideBar({ withoutAnimation: true })
  } else {
    useAppStore().toggleDevice('desktop')
  }
})

function toggleSideBar() {
	appStore.toggleSideBar()
}
function handleClickOutside() {
  useAppStore().closeSideBar({ withoutAnimation: false })
}

const settingRef = ref(null)
function setLayout() {
  settingRef.value.openSetting()
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}

.tags-view-wrap {
	height: 56px;
	display: flex;
	align-items: center;
	background: #00c7ba26;
	.hamburger-container {
    height: 100%;
		padding: 0 14px 0 10px;
    line-height: 56px;
    fill: #1890FF;
    cursor: pointer;
    transition: background 0.3s;
    background-color: transparent;
	}
}
</style>
