<template>
	<Dropdown
		:value="context._value"
		:options="context.options"
		@update:model-value="updateValue"
	/>
</template>

<script setup lang="ts">
import Dropdown from '../tw/dropdown.vue'

interface Props {
	context: any
}

const props = withDefaults(defineProps<Props>(), {})

function updateValue(value) {
	props.context.node.input(value)
}
</script>
