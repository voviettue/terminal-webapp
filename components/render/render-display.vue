<template>
	<component
		:is="`display-${name}`"
		:value="value!"
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
