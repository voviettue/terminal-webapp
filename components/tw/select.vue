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
			readonly ? 'pointer-events-none' : '',
		]"
	>
		<select
			v-model="selected"
			:name="name"
			:autocomplete="autocompleted"
			class="w-full border border-solid border-slate-400 px-3 py-2 rounded"
			@change="handleChange"
		>
			<option
				v-for="(item, index) in options"
				:key="`select_${index}`"
				:value="item.value"
			>
				{{ item.text }}
			</option>
		</select>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		autocompleted?: string
		name?: string
		readonly?: boolean
		disabled?: boolean
		options: Array<Record<string, string> | undefined>
	}>(),
	{
		options: () => [],
		modelValue: '',
		placeholder: '',
		autocompleted: 'off',
		name: '',
		readonly: false,
		disabled: false,
	}
)
const selected = ref(props.modelValue || '')
const emit = defineEmits(['update:modelValue', 'change'])
const handleChange = (event) => {
	emit('update:modelValue', event.target.value)
	emit('change', event.target.value)
}
</script>
<style scoped></style>
