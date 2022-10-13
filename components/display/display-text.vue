<template>
	<WidgetText :widget="widget" />
</template>
<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const text = Array.isArray(props.value) ? props.value.join('\n') : props.value
const options = { ...props.options, text }
const widget = {
	id: 'display-text',
	name: 'Display Text',
	width: 'full',
	options,
	...options,
}
</script>
