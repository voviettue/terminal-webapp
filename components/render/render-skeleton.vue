<template>
	<RenderWidget
		class="skeleton !bg-gray-100 rounded-lg animate-pulse"
		:widget="widget"
	></RenderWidget>
</template>

<script setup lang="ts">
import { Widget } from '~/shared/types'

interface Props {
	widget: Widget
}
defineProps<Props>()
</script>

<style scoped>
.skeleton :deep(*) {
	opacity: 0 !important;
}
</style>
