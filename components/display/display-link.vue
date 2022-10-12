<template>
	<span v-if="!text || !url">'—'</span>
	<WidgetLink v-else :widget="widget" />
</template>
<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { text: props.value, ...props.options }
const { text, url } = options
const widget = {
	id: 'display-link',
	name: 'Display Link',
	width: 'full',
	options,
	...options,
}
</script>
