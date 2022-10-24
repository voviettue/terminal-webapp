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
		]"
	>
		<TwIcon v-if="prefixIcon" :name="prefixIcon"></TwIcon>
		<slot v-else name="prefix-icon" class="h-full"></slot>
		<slot name="prefix" class="h-full"></slot>
		<input
			v-model="text"
			:type="type"
			:placeholder="placeholder"
			:autocomplete="autocompleted"
			:name="name"
			:readonly="readonly"
			class="h-full w-full border border-solid border-slate-400 px-3 py-2 rounded relative"
			:class="[readonly ? 'bg-slate-200 ' : '']"
			@onBlur="emit('blur', $event)"
			@input="handleInput($event)"
		/>

		<slot name="suffix" class="h-full"></slot>
		<TwIcon v-if="suffixIcon" :name="suffixIcon"></TwIcon>
		<slot v-else name="suffix-icon" class="h-full"></slot>
		<slot class="h-full"></slot>
	</div>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		type: string
		autocompleted?: string
		name?: string
		readonly?: boolean
		disabled?: boolean
		prefixIcon?: string
		suffixIcon?: string
	}>(),
	{
		modelValue: '',
		placeholder: '',
		type: 'text',
		autocompleted: 'off',
		name: '',
		readonly: false,
		disabled: false,
		prefixIcon: '',
		suffixIcon: '',
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
