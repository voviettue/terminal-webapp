<template>
	<WidgetIconButton :widget="widget" />
</template>
<script setup lang="ts">
import { inject } from 'vue'
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { ...props.options }
const displayContext = inject('display-context')

const widget = {
	id: 'display-icon-button',
	name: 'Display Icon Button',
	width: 'full',
	context: displayContext,
	options,
	...options,
}
</script>
