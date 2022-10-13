<template>
	<div
		:class="`${
			index === 0 ? 'justify-end' : ''
		} flex flex-row flex-nowrap items-baseline gap-4 px-1 py-2 leading-normal hover:bg-gray-50 hover:rounded-lg`"
	>
		<button
			v-if="index > 0"
			class="block text-gray-500 hover:text-red-500"
			@click="removeFilterRow"
		>
			<TwIcon name="close" class="icon text-xl" aria-hidden="true"></TwIcon>
		</button>
		<template v-if="index == 0">
			<span>Where</span>
		</template>
		<template v-else>
			<FormKit
				v-model="modelValue.condition"
				type="select"
				name="condition"
				:options="[
					{ label: 'AND', value: '_and' },
					{ label: 'OR', value: '_or' },
				]"
				:classes="{
					input: 'w-min py-2',
					outer: '!m-0',
				}"
			/>
		</template>
		<FormKit
			v-model="modelValue.field"
			type="select"
			name="field"
			:options="[{ label: 'Select field', value: null }, ...filterFields]"
			:classes="{
				input: 'w-min py-2',
				outer: '!m-0',
			}"
		/>
		<FormKit
			v-model="modelValue.operator"
			type="select"
			name="operator"
			:options="[{ label: 'Select operator', value: null }, ...filterOperators]"
			:classes="{
				input: 'w-min py-2',
				outer: '!m-0',
			}"
		/>
		<FormKit
			v-if="showValue"
			v-model="modelValue.value"
			type="text"
			name="value"
			placeholder="Enter value"
			:classes="{
				input: 'w-max py-2',
				outer: 'w-max !m-0',
			}"
		/>
	</div>
</template>

<script setup lang="ts">
import { getFilterOperatorsForType } from '@directus/shared/utils'
import operatorLabelMap from './operators'

interface Props {
	filterRow: any
	index: number
	fields: any
}

const props = defineProps<Props>()

const emit = defineEmits(['update', 'remove'])

const modelValue = ref({
	condition: '_and',
	field: null,
	operator: null,
	value: null,
})

const filterFields = computed(() =>
	props.fields
		.filter((field: any) => !field.hidden || !field.key)
		.map((field: any) => ({ label: field.label, value: field.key }))
)
const filterOperators = computed(() => {
	const field = modelValue.value.field
	let type = props.fields.find((el: any) => el.key === field)?.display

	switch (type) {
		case 'number':
		case 'percentage':
		case 'duration':
			type = 'integer'
			break
	}

	return getFilterOperatorsForType(type)
		.filter(
			(operator: any) =>
				!['between', 'nbetween', 'in', 'nin', 'null', 'nnull'].includes(
					operator
				)
		)
		.map((operator: any) => ({
			value: operator,
			label: operatorLabelMap.find((el: any) => el.value === operator)?.label,
		}))
})

const showValue = computed(() => {
	switch (modelValue.value.operator) {
		case 'empty':
		case 'nempty':
		case 'null':
		case 'nnull':
			modelValue.value.value = true
			return false

		default:
			return true
	}
})

function removeFilterRow() {
	emit('remove', props.index)
}

watch(
	() => props.filterRow,
	() => {
		Object.assign(modelValue.value, { ...props.filterRow })
	},
	{ immediate: true }
)

watch(
	modelValue,
	() => {
		emit('update', modelValue.value)
	},
	{ deep: true }
)
</script>

<style scoped></style>
