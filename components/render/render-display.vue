<template>
	<component
		:is="`display-${name}`"
		:value="value!"
		:options="options"
	></component>
</template>

<script setup lang="ts">
import { provide } from 'vue'
interface Props {
	name: string
	value: any
	options?: Record<string, any>
	context?: Record<string, any>
}
const props = defineProps<Props>()

provide('display-context', props.context)
</script>
