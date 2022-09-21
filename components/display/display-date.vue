<template>
	<span :style="styles">{{ date }}</span>
</template>

<script setup lang="ts">
interface Props {
	value: any
	options?: Required<{ format: string }>
}
const props = defineProps<Props>()

const { format, isValid } = useDateFns()

const { getStyles } = useUtils()
const styles = getStyles(props.options)

const date = computed(() => {
	let value = props.value
	if (typeof value === 'string') {
		value = new Date(value)
	}

	let formatOption
	if (props.options?.format === 'long') {
		formatOption = 'PPP'
	} else if (props.options?.format === 'short') {
		formatOption = 'MMM d, u'
	} else {
		formatOption = props.options?.format ?? 'PPP'
	}

	return isValid(value) ? format(value, formatOption) : '—'
})
</script>
