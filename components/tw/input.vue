<template>
	<div
		:class="[
			'flex',
			'justify-start',
			'items-center',
			'w-full',
			'bg-white',
			'h-9',
			disabled
				? 'bg-slate-200 opacity-50 pointer-events-none cursor-not-allowed'
				: '',
			'border border-solid border-slate-400',
		]"
	>
		<div class="text-lg flex items-center h-full bg-slate-200">
			<span v-if="prefix" class="px-2">{{ prefix }}</span>
			<slot v-else name="prefix" class="h-full px-2"></slot>
		</div>
		<div class="text-4xl flex items-center h-full">
			<TwIcon v-if="prefixIcon" :name="prefixIcon" class="px-2"></TwIcon>
			<slot v-else name="prefix-icon" class="h-full px-2"></slot>
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
			@onBlur="emit('blur', $event)"
			@input="handleInput($event)"
		/>

		<div class="text-4xl flex items-center h-full">
			<TwIcon v-if="suffixIcon" :name="suffixIcon" class="px-2 h-full"></TwIcon>
			<slot v-else name="suffix-icon" class="h-full px-2"></slot>
		</div>
		<div class="text-lg flex items-center h-full bg-slate-200">
			<span v-if="suffix" class="px-2 h-full">{{ suffix }}</span>
			<slot v-else name="suffix" class="h-full px-2"></slot>
		</div>
		<slot class="h-full"></slot>
	</div>
</template>
<script setup lang="ts">
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
	}
)
const text = ref(props.modelValue || '')
const emit = defineEmits(['update:modelValue', 'blur', 'change'])
const handleInput = (event) => {
	emit('update:modelValue', event.target.value)
	emit('change', event.target.value)
}
</script>
<style scoped></style>
