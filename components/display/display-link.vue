<template>
	<WidgetLink :widget="widget" />
</template>
<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { ...props.options, text: props.value }

const widget = {
	id: 'display-link',
	name: 'display-link',
	width: 'full',
	options,
	...options,
}
</script>
