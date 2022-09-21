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
	Number.isNaN(props.value) ? '—' : `${props.value * 100}%`
)
</script>
