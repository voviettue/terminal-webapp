<template>
	<div ref="refNumber">
		<FormField
			ref="refNumber"
			:label="label"
			:label-position="labelPosition"
			:label-alignment="alignment"
			:hide-label="hideLabel"
			:label-width="labelWidth"
			:label-style="styleLabel"
		>
			<FormKit
				:id="id"
				v-model="value"
				:name="name"
				type="customInput"
				input-type="text"
				:validation="validation.rules"
				:validation-messages="validation.messages"
				validation-visibility="live"
				:placeholder="placeholder"
				:min="minValue"
				:max="maxValue"
				:readonly="readonly"
				:disabled="disabled"
				:suffix="suffix"
				:prefix="prefix"
				:prefix-icon="prefixIcon"
				:suffix-icon="suffixIcon"
				:autofocus="autoFocus"
				:step="stepInterval"
				:tooltip="tooltip"
				:class="getClassInput()"
				:style="{
					borderRadius: borderRadius ?? undefined,
				}"
				:help="helpText"
				pattern="\d*"
				@input="onChangeText"
				@blur="onBlurText"
				@focus="handleFocus"
			></FormKit>
		</FormField>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { NumberInputWidget } from '~/shared/types'
import { useValidation } from '~/composables/use-validation'
import { strToSlug } from '~~/utils/str-to-slug'
interface Props {
	widget: NumberInputWidget
}

const props: any = defineProps<Props>()
// const options = ref(props.widget.options)
const {
	defaultValue,
	required,
	hideLabel,
	minValue,
	maxValue,
	placeholder,
	prefixIcon,
	readonly,
	suffixIcon,
	disabled,
	validations = [],
	labelFontStyle,
	label,
	labelPosition,
	alignment,
	labelColor,
	labelSize,
	labelFontFamily,
	labelWidth,
	onChange,
	stepInterval = 1,
	borderRadius,
	suffix,
	prefix,
	shadow,
	helpText,
	autoFocus,
	tooltip,
	showThousandsSeparator,
	decimalPlaces = 0,
} = props.widget.options as NumberInputWidget
const formatingNumber = (val) => {
	let text = ''
	if (decimalPlaces) {
		text = Number.parseFloat(val).toFixed(decimalPlaces)
	}
	if (showThousandsSeparator) {
		text = Number.parseFloat(val).toLocaleString('en-US', {
			maximumFractionDigits: decimalPlaces,
			minimumFractionDigits: decimalPlaces,
		})
	}
	return text
}

const value = ref(formatingNumber(defaultValue))
const name = strToSlug(props.widget.name || '')
const id = computed(() => props.widget.key)
const { result } = useBindData(defaultValue as string)
watch([result], () => {
	value.value = formatingNumber(result.value)
})

const onBlurText = (event) => {
	const val = event.target.value
	value.value = formatingNumber(val)
}

const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const emit = defineEmits(['input'])
const { validation } = useValidation(validations, required)
const refNumber = ref(null)

const styleLabel = getStyles({
	textColor: labelColor,
	textSize: labelSize,
	fontFamily: labelFontFamily,
	textStyle: labelFontStyle,
})

const onChangeText = (val) => {
	emit('input', val)
	if (!onChange) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onChange)
	fn(...Object.values(context))
}

const getClassInput = () => {
	const classes = {}
	if (shadow) classes[`shadow-${shadow}`] = true
	return classes
}
const handleFocus = ($event) => {
	const val = $event.target.value as string
	const num = val.replaceAll(',', '')
	value.value = Number.parseFloat(num).toString()
}
onMounted(() => {
	if (refNumber.value) {
		const input = refNumber.value.querySelector(`#${props.widget.key}`)
		input.onkeypress = (event) => {
			const isNum = event.charCode >= 48 && event.charCode <= 57
			if (event.target.value.includes('.')) return isNum
			return isNum || event.charCode === 46
		}
		input.onkeyup = (event) => {
			if (maxValue && Number.parseFloat(event.target.value) > maxValue)
				event.target.value = maxValue
			if (minValue && Number.parseFloat(event.target.value) < minValue)
				event.target.value = minValue
		}
	}
})
</script>
<style lang="scss" scoped>
.form-number-input {
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
		position: absolute;
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
	.label-input {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding-top: 5px;
	}
	&.align-right {
		.label-input {
			justify-content: flex-end;
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
