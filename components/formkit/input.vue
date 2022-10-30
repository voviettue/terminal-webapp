<template>
	<TwInput
		:id="context?.id"
		:name="context.node.name"
		:model-value="context._value"
		:type="context.inputType"
		:placeholder="context.placeholder"
		:autocomplete="context.autocomplete"
		:readonly="context.readonly"
		:disabled="context.disabled"
		:prefix-icon="context.prefixIcon"
		:suffix-icon="context.suffixIcon"
		:min="context.min"
		:max="context.max"
		:step="context.step"
		:min-length="context.minLength"
		:max-length="context.maxLength"
		:show-work-limit="context.showWorkLimit"
		:prefix="context.prefix"
		:suffix="context.suffix"
		:style="context.style"
		:autofocus="context.autofocus"
		:class="context.class"
		:tooltip="context.tooltip"
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
