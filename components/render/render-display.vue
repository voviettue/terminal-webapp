<template>
	<span v-if="value === null || value === undefined">—</span>
	<component
		:is="`display-${name}`"
		v-else
		:value="value"
		:options="options"
	></component>
</template>

<script setup lang="ts">
interface Props {
	name: string
	value: any
	options?: Record<string, any>
}
defineProps<Props>()
</script>
