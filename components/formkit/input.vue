<template>
	<TwInput
		:model-value="context._value"
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
		:input-style="context.inputStyle"
		:autofocus="context.autofocus"
		:input-custom-class="context.inputCustomClass"
		@change="handleChange"
		@blur="handleBlur"
		@update:model-value="updateValue"
	></TwInput>
</template>
<script setup lang="ts">
import TwInput from '../tw/input.vue'
interface Props {
	context: any
}
const handleChange = ($event) => {
	if (typeof props.context.attrs.onChange === 'function')
		props.context.attrs.onChange($event)
}
const handleBlur = ($event) => {
	if (typeof props.context.attrs.onBlur === 'function')
		props.context.attrs.onBlur($event)
}
const props = withDefaults(defineProps<Props>(), {})

function updateValue(value) {
	props.context.node.input(value)
}
</script>
