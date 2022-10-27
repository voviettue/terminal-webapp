<template>
	<div class="input" :class="inputClass">
		<div
			class="text-base flex items-center h-full bg-gray-50 border-r border-gray-200"
		>
			<span v-if="prefix" class="prefix px-2 h-max opacity-80">
				{{ prefix }}
			</span>
			<slot v-else name="prefix" class="h-full px-2"></slot>
		</div>
		<div class="text-xl flex items-center h-full">
			<TwIcon
				v-if="prefixIcon"
				:name="prefixIcon"
				class="pl-2 h-max opacity-80"
			></TwIcon>
			<slot v-else name="prefix-icon" class="h-full pl-2"></slot>
		</div>

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
			class="h-full w-full border-none px-3 py-2 rounded relative focus:border-none outline-none"
			:class="[readonly ? 'bg-slate-200 ' : '']"
			:autofocus="autofocus"
			@blur="emit('blur', $event)"
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
	'w-full',
	'bg-white',
	'h-9',
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
