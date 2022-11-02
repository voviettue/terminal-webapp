<template>
	<div :class="dropdownClass">
		<TwIcon v-if="icon" :name="icon" class="text-lg mx-3"></TwIcon>
		<Combobox
			v-model="selectedOption"
			as="div"
			class="w-full relative combobox-select"
			:disabled="disabled"
		>
			<ComboboxInput
				class="input-select w-full border-none bg-white py-2 pl-3 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
				:display-value="(person: any) => person?.text"
				:placeholder="placeholder"
				@change="hanldeChangeInput"
			></ComboboxInput>
			<ComboboxButton
				class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
			>
				<TwIcon
					name="keyboard_arrow_down"
					class="text-xl w-5 text-gray-400"
					aria-hidden="true"
				/>
			</ComboboxButton>

			<ComboboxOptions
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			>
				<ComboboxOption
					v-for="option in filteredOptions"
					:key="option.value"
					v-slot="{ active, selected }"
					:value="option"
					as="template"
				>
					<li
						:class="[
							'relative cursor-default select-none py-2 pl-3 pr-9',
							active ? 'bg-indigo-600 text-white' : 'text-gray-900',
						]"
					>
						<div class="block truncate">
							<p :class="[selected && 'font-semibold']">
								{{ option.text }}
							</p>
							<p v-if="option.secondaryText" class="ml-1 text-xs opacity-80">
								{{ option.secondaryText }}
							</p>
						</div>

						<span
							v-if="selected"
							:class="[
								'absolute inset-y-0 right-0 flex items-center pr-4',
								active ? 'text-white' : 'text-indigo-600',
							]"
						>
							<TwIcon name="check" class="text-xl w-5" aria-hidden="true" />
						</span>
					</li>
				</ComboboxOption>
			</ComboboxOptions>
		</Combobox>
	</div>
</template>

<script setup lang="ts">
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/vue'

interface Props {
	value?: string | number
	options: { value: string | number; text: string; secondaryText?: string }[]
	allowSearch?: boolean
	placeholder?: string
	disabled?: boolean
	icon?: string
}

const props = withDefaults(defineProps<Props>(), {
	value: null,
	options: () => [],
	allowSearch: false,
	placeholder: 'Select',
	disabled: false,
	icon: '',
})
const emit = defineEmits(['update:modelValue'])
const dropdownClass = [
	'border',
	' border-gray-300',
	'flex',
	'justify-start',
	'items-center',
]
const query = ref('')
const selectedOption = ref(null)

watchEffect(() => {
	selectedOption.value = props.options.find((e) => e.value === props.value)
})

const filteredOptions = computed(() =>
	props.options.filter((e) =>
		e.text?.toLowerCase().includes(query.value?.toLowerCase())
	)
)
const hanldeChangeInput = (event) => {
	if (props.allowSearch) {
		query.value = event.target.value
	}
}
watch(selectedOption, () => {
	emit('update:modelValue', selectedOption.value?.value)
})
</script>
<style lang="scss">
.combobox-select {
	border-radius: inherit;
	.input-select {
		border-radius: inherit;
	}
}
</style>
