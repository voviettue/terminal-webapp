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
		<slot name="prefix-icon" class="h-full"></slot>
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
			@onBlur="emit('blur', $event.target.value)"
			@input="handleInput($event)"
		/>
		<TwIcon
			v-if="clearable && type === 'text'"
			name="close"
			class="p-0.5 rounded-full border border-solid border-slate-400 hover:border-slate-600 !absolute right-5"
			@click="text = ''"
		></TwIcon>

		<slot name="suffix" class="h-full"></slot>

		<slot name="suffix-icon" class="h-full"></slot>
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
		clearable?: boolean
		name?: string
		readonly?: boolean
		disabled?: boolean
	}>(),
	{
		modelValue: '',
		placeholder: '',
		type: 'text',
		autocompleted: 'off',
		clearable: false,
		name: '',
		readonly: false,
		disabled: false,
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
