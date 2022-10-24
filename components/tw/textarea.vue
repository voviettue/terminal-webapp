<template>
	<div
		:class="[
			'flex',
			'justify-start',
			'items-center',
			'w-full',
			'bg-white',
			disabled
				? 'bg-slate-200 opacity-50 pointer-events-none cursor-not-allowed'
				: '',
		]"
	>
		<textarea
			v-model="text"
			:rows="rows"
			:placeholder="placeholder"
			:autocomplete="autocompleted"
			:name="name"
			:readonly="readonly"
			class="w-full border border-solid border-slate-400 px-3 py-2 rounded"
			:class="[readonly ? 'bg-slate-200 ' : '']"
			@onBlur="emit('blur', $event.target.value)"
			@input="handleInput($event)"
		></textarea>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		rows?: number
		autocompleted?: string
		name?: string
		readonly?: boolean
		disabled?: boolean
	}>(),
	{
		modelValue: '',
		placeholder: '',
		autocompleted: 'off',
		name: '',
		readonly: false,
		disabled: false,
		rows: 3,
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
