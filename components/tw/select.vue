<template>
	<div v-tooltip="tooltip" class="input" :class="inputClass">
		<slot name="prefix" class="px-2">
			<div
				v-if="prefix"
				class="flex items-center bg-gray-50 border-r border-gray-200"
			>
				<span class="prefix px-2 h-max opacity-80">
					{{ prefix }}
				</span>
			</div>
		</slot>
		<slot name="prefix-icon" class="pl-2">
			<div v-if="prefixIcon" class="text-xl flex items-center">
				<TwIcon
					v-if="prefixIcon"
					:name="prefixIcon"
					class="pl-2 h-max opacity-70"
				></TwIcon>
			</div>
		</slot>

		<select v-model="value" :name="name" class="block pl-3 py-2 rounded">
			<option
				v-for="(item, index) in options"
				:key="`select_${index}`"
				:value="item.value"
			>
				{{ item.text }}
			</option>
		</select>

		<slot name="suffix-icon" class="pr-2">
			<div v-if="suffixIcon" class="text-xl flex items-center">
				<TwIcon
					v-if="suffixIcon"
					:name="suffixIcon"
					class="pr-2 h-max opacity-70"
				></TwIcon>
			</div>
		</slot>

		<slot name="suffix" class="px-2">
			<div
				v-if="suffix"
				class="flex items-center bg-gray-50 border-l border-gray-200"
			>
				<span class="px-2 h-max opacity-80">{{ suffix }}</span>
			</div>
		</slot>
	</div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

const props = withDefaults(
	defineProps<{
		id?: string
		name?: string
		modelValue?: string
		options?: Array<Record<string, any>>
		placeholder?: string
		type: string
		autocomplete?: string
		readonly?: boolean
		disabled?: boolean
		prefixIcon?: string
		suffixIcon?: string
		prefix?: string
		suffix?: string
		autofocus?: boolean
		tooltip?: string
	}>(),
	{
		id: undefined,
		name: undefined,
		modelValue: '',
		options: () => [],
		placeholder: '',
		type: 'text',
		autocomplete: 'off',
		readonly: false,
		disabled: false,
		prefixIcon: '',
		suffixIcon: '',
		prefix: '',
		suffix: '',
		autofocus: false,
		tooltip: '',
	}
)
// @TODO: use attributes for min/max/minLength/maxLength/.....
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'blur', 'change', 'focus'])

const value = computed({
	get() {
		return props.modelValue
	},
	// setter
	set(newValue) {
		emit('update:modelValue', newValue)
		emit('change', newValue)
	},
})

const inputClass = [
	'flex',
	'justify-start',
	'items-center',
	'items-stretch',
	'w-full',
	'bg-white',
	'leading-5',
	'text-gray-800',
	props.disabled
		? 'bg-slate-200 opacity-50 pointer-events-none cursor-not-allowed'
		: '',
	'border border-solid border-gray-300 overflow-hidden',
	'rounded-md',
	attrs?.class,
]
</script>

<style scoped>
select {
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
	background-position: right 0.5rem center;
	background-repeat: no-repeat;
	background-size: 1.5em 1.5em;
	padding-right: 2rem;
	-webkit-print-color-adjust: exact;
	color-adjust: exact;
	appearance: none;
	font-family: 'Inter';
}

select:focus-within {
	@apply ring-indigo-500;
	outline: 2px solid transparent;
	outline-offset: 2px;
	box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
		var(--tw-shadow);
	border-color: #2563eb;
}
</style>
