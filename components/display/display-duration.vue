<template>
	<span :style="styles">{{ duration ?? '—' }}</span>
</template>

<script setup lang="ts">
interface Props {
	value: any
	options?: Required<{ format: string; type: string }>
}
const props = defineProps<Props>()

const { getStyles } = useUtils()
const styles = getStyles(props.options)
const { format = 'hh:mm', type } = props.options

const duration = computed(() => {
	if (!props.value) return

	switch (type) {
		case 'time':
			return formatTime(props.value)

		case 'integer':
		case 'bigInteger':
			return formatNumber(props.value)
	}
})

function formatTime(val: string) {
	if (val === null) return

	const timeArr = val.split(':')
	switch (format) {
		case 'hh:mm:ss':
			return `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
		case 'hh:mm':
			return `${timeArr[0]}:${timeArr[1]}`
		case 'mm:ss':
			return `${timeArr[1]}:${timeArr[2]}`
	}
}

function formatNumber(val: string) {
	if (val === null) return

	const hours = Math.floor(parseInt(val) / (3600 * 1000))
	const minutes = Math.floor((parseInt(val) / 1000 - hours * 3600) / 60)
	const seconds = parseInt(val) / 1000 - hours * 3600 - minutes * 60

	switch (format) {
		case 'hh:mm:ss':
			return `${addLeadingZero(hours)}:${addLeadingZero(
				minutes
			)}:${addLeadingZero(seconds)}`
		case 'hh:mm':
			return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`
		case 'mm:ss':
			return `${addLeadingZero((hours ?? 0) * 60 + minutes)}:${addLeadingZero(
				seconds
			)}`
	}
}

function addLeadingZero(number: any = 0, size = 2): string {
	return number.toString().padStart(size, '0')
}
</script>
