<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<WidgetText
		v-for="(value, index) in values"
		:key="uniqueId('display-text-' + index)"
		:widget="getWidget(value)"
	/>
</template>
<script setup lang="ts">
import uniqueId from 'lodash/uniqueId'

interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const displayContext = inject('display-context')

const values = computed(() => {
	const text = props.options?.text || props.value
	return Array.isArray(text) ? text : [text]
})

function getWidget(text) {
	const options = { ...props.options, text }
	return {
		id: 'display-text',
		name: 'Display Text',
		width: 'full',
		context: displayContext,
		options,
		...options,
	}
}
</script>
