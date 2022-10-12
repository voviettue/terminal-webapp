<template>
	<WidgetText :widget="widget" />
</template>
<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { ...props.options, text: props.value }
const widget = {
	id: 'display-label',
	name: 'Display Label',
	width: 'full',
	options,
	...options,
}
</script>
