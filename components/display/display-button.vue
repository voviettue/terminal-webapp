<template>
	<WidgetButton :widget="widget" />
</template>
<script setup lang="ts">
import { inject } from 'vue'
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { ...props.options, label: props.options?.label || props.value }
const displayContext = inject('display-context')

const widget = {
	id: 'display-button',
	name: 'Display Button',
	width: 'full',
	context: displayContext,
	options,
	...options,
}
</script>
