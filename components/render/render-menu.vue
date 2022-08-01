<template>
	<component :is="`menu-${menu}`" :label="label" v-bind="options"></component>
</template>

<script setup lang="ts">
interface Props {
	menu: string
	label?: string
	options?: Record<string, any>
}

defineProps<Props>()
</script>
