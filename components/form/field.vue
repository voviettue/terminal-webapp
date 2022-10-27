<template>
	<div
		:class="[
			'w-full',
			labelPosition !== 'left' ? 'label-top' : 'label-left',
			'form-item',
		]"
	>
		<div :class="getClassLabel()">
			<label
				v-if="!hideLabel"
				:for="nameId"
				:style="labelStyle"
				class="label-field"
			>
				{{ label }}
			</label>
		</div>
		<div :class="getClassSlot()">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { CSSProperties } from 'vue'
interface Props {
	nameId?: string
	label?: string
	hideLabel: boolean
	labelPosition?: string
	labelWidth?: number
	labelStyle?: Record<string, string> | CSSProperties
	labelAlignment?: string
}
const props = withDefaults(defineProps<Props>(), {
	nameId: '',
	label: '',
	labelPosition: 'left',
	labelWidth: 2,
	labelStyle: () => ({}),
	hideLabel: false,
	labelAlignment: 'left',
})
const getClassLabel = () => {
	const classes = {
		flex: true,
		'items-start': true,
	}
	if (props.labelPosition === 'left') classes[`grid-${props.labelWidth}`] = true
	if (props.labelAlignment === 'left') classes['justify-start'] = true
	else classes['justify-end'] = true
	return classes
}
const getClassSlot = () => {
	const classes = { 'slot-field': true }
	if (props.labelPosition === 'left')
		classes[`grid-${6 - props.labelWidth}`] = true
	return classes
}
</script>
<style lang="scss">
.form-item {
	display: grid;
	grid-template-columns: repeat(6, minmax(0, 1fr));
	column-gap: 24px;
	row-gap: 10px;
	.grid-1 {
		grid-column: span 1 / span 6;
	}
	.grid-2 {
		grid-column: span 2 / span 6;
	}
	.grid-3 {
		grid-column: span 3 / span 6;
	}
	.grid-4 {
		grid-column: span 4 / span 6;
	}
	.grid-5 {
		grid-column: span 5 / span 6;
	}
	.grid-6 {
		grid-column: span 6 / span 6;
	}
	&.label-top {
		.label-field,
		.slot-field {
			grid-column: span 6 / span 6 !important;
		}
	}
}
</style>
