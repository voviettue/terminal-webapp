<template>
	<span :style="styles">{{ displayValue }}</span>
</template>

<script setup lang="ts">
interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()

const { getStyles } = useUtils()
const styles = getStyles(props.options)

const displayValue = computed(() =>
	Number.isNaN(props.value) ? '—' : formattedValue(props.value)
)

const formattedValue = (value: number) => {
	const str = String(value).split('.')

	str[0] = str[0] || ''
	const left = []
	for (let i = str[0].length; i > 0; i -= 3) {
		left.unshift(str[0].substring(Math.max(0, i - 3), i))
	}
	str[0] = left.join(props.options?.thousandsSeparator || '')

	const number = str.join(props.options?.decimalSeparator || '.')

	return `${props.options?.prefix || ''}${number}${props.options?.suffix || ''}`
}
</script>
