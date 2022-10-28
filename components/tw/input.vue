<template>
	<div class="input" :class="inputClass">
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
				<slot v-else name="prefix-icon" class="pl-2"></slot>
			</div>
		</slot>

		<input
			:id="id"
			v-model="value"
			:type="type"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:name="name"
			:readonly="readonly"
			:disabled="disabled"
			:min="min"
			:max="max"
			:min-length="minLength"
			:max-length="maxLength"
			class="w-full border-none px-3 py-2 rounded relative focus:border-none outline-none"
			:class="[readonly ? 'bg-slate-200 ' : '']"
			:autofocus="autofocus"
			@blur="emit('blur', $event)"
		/>

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
		placeholder?: string
		type: string
		autocomplete?: string
		readonly?: boolean
		disabled?: boolean
		prefixIcon?: string
		suffixIcon?: string
		min?: number | string
		max?: number | string
		minLength?: number
		maxLength?: number
		prefix?: string
		suffix?: string
		autofocus?: boolean
	}>(),
	{
		id: undefined,
		name: undefined,
		modelValue: '',
		placeholder: '',
		type: 'text',
		autocomplete: 'off',
		readonly: false,
		disabled: false,
		prefixIcon: '',
		suffixIcon: '',
		min: undefined,
		max: undefined,
		minLength: undefined,
		maxLength: undefined,
		prefix: '',
		suffix: '',
		autofocus: false,
	}
)
// @TODO: use attributes for min/max/minLength/maxLength/.....
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'blur', 'change'])

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
.input {
	font-family: 'Inter';
}

.input:focus-within {
	@apply ring-indigo-500;
	outline: 2px solid transparent;
	outline-offset: 2px;
	box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
		var(--tw-shadow);
	border-color: #2563eb;
}
</style>
