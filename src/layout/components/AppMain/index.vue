<template>
	<section class="app-main">
		<router-view v-slot="{ Component, route }">
			<transition name="fade-transform" mode="out-in">
				<keep-alive :include="tagsViewStore.cachedViews">
					<component
						v-if="!route.meta.link"
						:is="Component"
						:key="route.path"
					/>
				</keep-alive>
			</transition>
		</router-view>
		<iframe-toggle />
	</section>
</template>

<script setup>
import iframeToggle from '../IframeToggle/index'
import useTagsViewStore from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStore()
</script>

<style lang="scss" scoped>
.app-main {
	width: 100%;
	height: 100%;
  position: relative;
  overflow-x: hidden;
	overflow-y: auto;
}

.fixed-header + .app-main {
	padding-top: 50px;
}

.hasTagsView {
	.fixed-header + .app-main {
		padding-top: 84px;
	}
}

.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 6px;
	}
}
</style>

