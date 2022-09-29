<template>
	<WidgetButton :widget="widget" />
</template>
<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { ...props.options, label: props.options?.label || props.value }

const widget = {
	id: 'display-button',
	name: 'display-button',
	width: 'full',
	options,
	...options,
}
</script>
