<template>
	<span>{{ displayValue }}</span>
</template>

<script setup lang="ts">
interface Props {
	value: any
	options?: Required<{ format: string }>
}
const props = defineProps<Props>()

const displayValue = computed(() =>
	Number.isNaN(props.value) ? '—-' : `${props.value * 100}%`
)
</script>
