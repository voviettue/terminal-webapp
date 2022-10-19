<template>
	<WidgetImage :widget="widget" />
</template>
<script setup lang="ts">
import { inject } from 'vue'
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = {
	...props.options,
	url: props.options?.url || props.value,
	file: props.options?.file || props.value,
}

const displayContext = inject('display-context')

const widget = {
	id: 'widget-image',
	name: 'Widget Image',
	width: 'full',
	context: displayContext,
	options,
	...options,
}
</script>
