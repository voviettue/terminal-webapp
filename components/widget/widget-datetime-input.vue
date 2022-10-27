<template>
	<FormField
		v-tooltip="tooltip"
		:label="label"
		:label-position="labelPosition"
		:label-alignment="alignment"
		:hide-label="hideLabel"
		:label-width="labelWidth"
		:label-style="styleLabel"
	>
		<FormKit
			:id="widget.key"
			v-model="value"
			:name="name"
			type="customInput"
			:input-type="timePrecision ? 'datetime-local' : 'date'"
			:validation="validation.rules"
			:validation-messages="validation.messages"
			validation-visibility="live"
			:placeholder="placeholder"
			:min="min"
			:max="max"
			:step="step"
			:readonly="readonly"
			:disabled="disabled"
			:suffix="suffix"
			:prefix="prefix"
			:prefix-icon="prefixIcon"
			:suffix-icon="suffixIcon"
			:autofocus="autoFocus"
			:class="getClassInput()"
			:style="{
				borderRadius: borderRadius ?? undefined,
			}"
			:help="helpText"
			@input="onChangeText"
		></FormKit>
	</FormField>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { parse, format } from 'date-fns'
import { DatetimeInputWidget } from '~/shared/types'
import { useValidation } from '~/composables/use-validation'
import { strToSlug } from '~~/utils/str-to-slug'

interface Props {
	widget: DatetimeInputWidget
}

const emit = defineEmits(['input', 'reset'])
const props: any = defineProps<Props>()
const {
	defaultValue,
	required,
	validations = [],
	placeholder,
	prefixIcon,
	suffixIcon,
	trim,
	minDate,
	maxDate,
	timePrecision,
	disabled,
	label,
	labelPosition,
	alignment,
	labelColor,
	labelSize,
	labelFontFamily,
	labelWidth,
	onChange,
	borderRadius,
	shadow,
	autoFocus,
	tooltip,
	hideLabel,
	readonly,
	prefix,
	suffix,
	helpText,
	labelFontStyle,
} = props.widget.options

const value = ref(defaultValue)
const name = strToSlug(props.widget.name || '')

const { result } = useBindData(defaultValue)
watch([result], () => {
	value.value = result.value
})

const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

watch(value, (newValue) => {
	if (trim) {
		value.value = newValue.trim()
	}
})
const onChangeText = (val) => {
	emit('input', val)
	if (!onChange) return
	const context = { ...pageStore.context, ...props.widget.context, $value: val }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onChange)
	fn(...Object.values(context))
}

const styleLabel = getStyles({
	textColor: labelColor,
	textSize: labelSize,
	fontFamily: labelFontFamily,
	textStyle: labelFontStyle,
})

const { validation } = useValidation(validations, required)

const getClassInput = () => {
	const classes = {}
	if (shadow) classes[`shadow-${shadow}`] = true
	return classes
}

const min = computed(() => {
	const minDateObj = parse(minDate, 'yyyy-MM-dd', new Date())
	return format(minDateObj, timePrecision ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd')
})

const max = computed(() => {
	const maxDateObj = parse(maxDate, 'yyyy-MM-dd', new Date())
	return format(maxDateObj, timePrecision ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd')
})

const step = computed(() => {
	switch (timePrecision) {
		case 'hh:mm':
			return 60
		case 'hh:mm:ss':
			return 1
	}
})
</script>
<style lang="scss" scoped>
.form-text-input {
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
	&.has-icon {
		:deep().formkit-input {
			border-radius: 0px;
			border-top: none;
			border-bottom: none;
		}
	}
	:deep().formkit-message {
		// position: absolute;
		width: 100%;
	}
	:deep().formkit-inner {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 0px;
		.formkit-input {
			border-radius: 0px;
		}
	}
	:deep().formkit-outer {
		width: 100%;
	}

	&.readonly {
		:deep().formkit-outer {
			pointer-events: none;
		}
	}
	.label-input {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding-top: 5px;
	}
	&.align-right.label-left {
		.label-input {
			justify-content: flex-end;
		}
	}

	&.tooltip {
		position: relative;
		word-wrap: break-word;
		.tooltiptext {
			visibility: hidden;
			background-color: black;
			color: #fff;
			text-align: center;
			border-radius: 6px;
			padding: 5px;
			position: absolute;
			z-index: 1000;
			top: -35px;
			left: 50%;
			opacity: 0;
			transition: opacity 0.3s;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			transform: translateX(-50%);
			width: max-content;
			&::after {
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				margin-left: -5px;
				border-width: 5px;
				border-style: solid;
				border-color: #555 transparent transparent transparent;
			}
		}
		&:hover {
			.tooltiptext {
				visibility: visible;
				opacity: 1;
			}
		}
	}
	&.label-top {
		.form-kit-input,
		.label-input {
			grid-column: span 6 / span 6;
		}
		.label-input {
			align-items: center;
			padding: 0;
		}
		.tooltiptext {
			top: -15px;
		}
	}
}
</style>
