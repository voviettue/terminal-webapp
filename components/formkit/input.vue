<template>
	<TwInput
		:value="context._value"
		:input-type="context.inputType"
		:placeholder="context.placeholder"
		:autocomplete="context.autocomplete"
		:name-id="context.nameId"
		:readonly="context.readonly"
		:disabled="context.disabled"
		:prefix-icon="context.prefixIcon"
		:suffix-icon="context.suffixIcon"
		:min="context.min"
		:max="context.max"
		:min-length="context.minLength"
		:max-length="context.maxLength"
		:show-work-limit="context.showWorkLimit"
		:prefix="context.prefix"
		:suffix="context.suffix"
		@change="emit('change', $event)"
		@blur="emit('blur', $event)"
		@update:model-value="updateValue"
	></TwInput>
</template>
<script setup lang="ts">
import TwInput from '../tw/input.vue'
interface Props {
	context: any
}
const emit = defineEmits(['blur', 'change'])
const props = withDefaults(defineProps<Props>(), {})

function updateValue(value) {
	props.context.node.input(value)
}
</script>
