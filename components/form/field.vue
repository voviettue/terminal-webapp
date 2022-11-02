<template>
	<div :class="formFieldClass">
		<div :class="labelClass">
			<label
				v-if="!hideLabel"
				:for="nameId"
				:style="labelStyle"
				class="label-field"
			>
				{{ label }}
			</label>
		</div>
		<div class="space-y-4" :class="classSlot">
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

const labelWidth = props.labelPosition === 'top' ? 6 : props.labelWidth
const inputWidth = props.labelPosition === 'top' ? 6 : 6 - labelWidth

const labelClass = {
	'flex items-start': true,
	[`grid-${labelWidth}`]: true,
	'justify-end': props.labelAlignment === 'right',
	'!justify-start':
		props.labelPosition === 'top' || props.labelAlignment === 'left',
}

const classSlot = {
	'slot-field': true,
	[`grid-${inputWidth}`]: true,
}
const attrs = useAttrs()

const formFieldClass = [
	'w-full',
	props.labelPosition !== 'left' ? 'label-top' : 'label-left',
	'form-item',
	'items-baseline',
	attrs?.class,
]
</script>

<style lang="scss">
// @TODO: use common css class
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
