<template>
	<button
		class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow `"
		type="button"
	>
		{{ value }}
	</button>
</template>
<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()
const options = { ...props.options, text: props.value }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const widget = {
	id: 'display-button',
	name: 'display-button',
	width: 'full',
	options,
	...options,
}
</script>
