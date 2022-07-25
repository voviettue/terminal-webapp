<template>
	<span>{{ date }}</span>
</template>

<script setup lang="ts">
interface Props {
	value: any
	options?: Required<{ format: string }>
}
const props = defineProps<Props>()

const { format, isValid } = useDateFns()

const date = computed(() => {
	let value = props.value
	if (typeof value === 'string') {
		value = new Date(value)
	}

	return isValid(value)
		? format(value, props.options?.format ?? 'MMM dd, Y')
		: '—'
})
</script>
