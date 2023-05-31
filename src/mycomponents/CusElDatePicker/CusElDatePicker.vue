<script setup name="CusElDatePicker">
	const props = defineProps({
		showFormat: {
			type: String,
			default: 'YYYY-MM-DD'
		},
		focusFormat: {
			type: String,
			default: 'YYYYMMDD'
		},
		valueFormat: {
			type: String,
			default: 'YYYY-MM-DD'
		}
	})
	const emits = defineEmits(['visible-change', 'blur', 'focus'])

	const format = ref('YYYY-MM-DD')

	const handleVisibleChange = function (visible) {
		if (visible) {
			format.value = props.focusFormat
		} else {
			format.value = props.showFormat
		}

		emits('visible-change', visible)
	}

	const handleBlur = function (e) {
		emits('blur', e)
	}

	const handleFocus = function (e) {
		emits('focus', e)
	}
</script>

<template>
	<el-date-picker
		:format="format"
		:value-format="valueFormat"
		@visible-change="handleVisibleChange"
		@blur="handleBlur"
		@focus="handleFocus"
	></el-date-picker>
</template>

<style scoped lang="scss">
</style>
