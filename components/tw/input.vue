<template>
	<div :class="customInputClass()" :style="inputStyle">
		<div class="text-base flex items-center h-full bg-slate-200">
			<span v-if="prefix" class="px-2 h-max">{{ prefix }}</span>
			<slot v-else name="prefix" class="h-full px-2"></slot>
		</div>
		<div class="text-xl flex items-center h-full">
			<TwIcon v-if="prefixIcon" :name="prefixIcon" class="pl-2 h-max"></TwIcon>
			<slot v-else name="prefix-icon" class="h-full pl-2"></slot>
		</div>

		<input
			:id="nameId"
			v-model="text"
			:type="inputType"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:name="nameId"
			:readonly="readonly"
			:disabled="disabled"
			:min="min"
			:max="max"
			:min-length="minLength"
			:max-length="maxLength"
			class="h-full w-full border-none px-3 py-2 rounded relative focus:border-none focus:outline-none"
			:class="[readonly ? 'bg-slate-200 ' : '']"
			:autofocus="autofocus"
			@blur="emit('blur', $event)"
			@input="handleInput($event)"
		/>

		<div class="text-xl flex items-center h-full">
			<TwIcon v-if="suffixIcon" :name="suffixIcon" class="pr-2 h-max"></TwIcon>
			<slot v-else name="suffix-icon" class="h-full pr-2"></slot>
		</div>
		<div class="text-base flex items-center h-full bg-slate-200">
			<span v-if="suffix" class="px-2 h-max">{{ suffix }}</span>
			<slot v-else name="suffix" class="h-full px-2"></slot>
		</div>
		<slot class="h-full"></slot>
	</div>
</template>
<script setup lang="ts">
import { CSSProperties } from 'vue'
const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		inputType: string
		autocomplete?: string
		nameId?: string
		readonly?: boolean
		disabled?: boolean
		prefixIcon?: string
		suffixIcon?: string
		min?: number | string
		max?: number | string
		showWorkLimit?: boolean
		minLength?: number
		maxLength?: number
		prefix?: string
		suffix?: string
		inputStyle?: CSSProperties
		autofocus?: boolean
		inputCustomClass?: Record<string, boolean> | Array<string>
	}>(),
	{
		modelValue: '',
		placeholder: '',
		inputType: 'text',
		autocomplete: 'off',
		nameId: '',
		readonly: false,
		disabled: false,
		prefixIcon: '',
		suffixIcon: '',
		min: undefined,
		max: undefined,
		showWorkLimit: false,
		minLength: undefined,
		maxLength: undefined,
		prefix: '',
		suffix: '',
		inputStyle: () => ({}),
		autofocus: false,
		inputCustomClass: () => ({}),
	}
)
const text = ref(props.modelValue || '')
const emit = defineEmits(['update:modelValue', 'blur', 'change'])
const handleInput = (event) => {
	emit('update:modelValue', event.target.value)
	emit('change', event.target.value)
}
const customInputClass = () => {
	const arr = [
		'flex',
		'justify-start',
		'items-center',
		'w-full',
		'bg-white',
		'h-9',
		props.disabled
			? 'bg-slate-200 opacity-50 pointer-events-none cursor-not-allowed'
			: '',
		'border border-solid border-slate-400 overflow-hidden',
	]
	if (Array.isArray(props.inputCustomClass))
		return [...arr, ...props.inputCustomClass]
	const customClass = props.inputCustomClass as Record<string, boolean>
	const classes = Object.keys(customClass).filter(
		(item: string) => !!customClass[item]
	)
	return [...arr, ...classes]
}
</script>
<style scoped></style>
