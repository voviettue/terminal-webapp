<template>
	<FormField
		:label="label"
		:label-position="labelPosition"
		:label-alignment="alignment"
		:hide-label="hideLabel"
		:label-width="labelWidth"
		:label-style="styleLabel"
	>
		<FormKit
			v-model="value"
			type="number"
			:validation="validation.rules"
			:validation-messages="validation.messages"
			:validation-label="label"
			validation-visibility="dirty"
			:step="stepInterval"
			:name="name"
			:help="helpText"
		>
			<template #inner>
				<div ref="refNumber">
					<TwInput
						:id="id"
						v-model="formatedValue"
						type="text"
						:placeholder="placeholder"
						:readonly="readonly"
						:disabled="disabled"
						:suffix="suffix"
						:prefix="prefix"
						:prefix-icon="prefixIcon"
						:suffix-icon="suffixIcon"
						:tooltip="tooltip"
						:class="getClassInput()"
						:autofocus="autofocus"
						:style="{
							borderRadius: borderRadius ?? undefined,
						}"
						pattern="\d*"
						@input="onChangeText"
						@blur="onBlurText"
						@focus="handleFocus"
					>
						<template #step-number>
							<div class="flex flex-col justify-center border-l">
								<TwIcon
									name="keyboard_arrow_up"
									class="border-b text-base"
									@click.stop="handleClickIcon('up')"
								></TwIcon>
								<TwIcon
									name="keyboard_arrow_down"
									class="text-base"
									@click.stop="handleClickIcon('down')"
								></TwIcon>
							</div>
						</template>
					</TwInput>
				</div>
			</template>
		</FormKit>
	</FormField>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { NumberInputWidget } from '~/shared/types'
import { useValidation } from '~/composables/use-validation'
import { convertInputName } from '~~/utils/convert-input-name'

interface Props {
	widget: NumberInputWidget
}

const props: any = defineProps<Props>()
// const options = ref(props.widget.options)
const {
	defaultValue,
	required,
	hideLabel,
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
	autofocus,
	tooltip,
	showThousandsSeparator,
	decimalPlaces = 3,
} = props.widget.options as NumberInputWidget
const formatingNumber = (val) => {
	if (val === null || val === '' || val === undefined) return null
	let text: string = val
	text = text.toString().replaceAll(',', '')
	text = Number.parseFloat(text).toFixed(decimalPlaces || 0)

	if (showThousandsSeparator) {
		text = Number.parseFloat(text).toLocaleString('en-US', {
			maximumFractionDigits: decimalPlaces,
			minimumFractionDigits: decimalPlaces,
		})
	}
	return text
}
const convertNumber = (val: string): number | string => {
	const num = (val ?? '').toString().replaceAll(',', '')
	if (!num) return null
	return Number.parseFloat(num)
}
const value = ref(null)
const formatedValue = ref(formatingNumber(defaultValue))
const name = convertInputName(props.widget.name)
const id = computed(() => props.widget.key)
const { result } = useBindData(defaultValue as string)
watch([result], () => {
	value.value = result.value
	formatedValue.value = formatingNumber(result.value)
})

watch(
	() => formatedValue.value,
	(newValue) => {
		value.value = convertNumber(newValue)
	}
)

const onBlurText = (event) => {
	let val = event.target.value
	if (val === '-') {
		val = ''
	}
	formatedValue.value = formatingNumber(val)
}

const handleClickIcon = (event, key?) => {
	let data = value.value as number | null
	if (data === null) return
	switch (event) {
		case 'up': {
			data += stepInterval
			break
		}
		case 'down': {
			data -= stepInterval
			break
		}
	}
	value.value = data
	formatedValue.value = key
		? convertNumber(data.toFixed(decimalPlaces || 0)) !== null
			? convertNumber(data.toFixed(decimalPlaces || 0)).toString()
			: ''
		: formatingNumber(data)
}

const handleFocus = ($event) => {
	const val = $event.target.value as string
	const converted = convertNumber(val)
	formatedValue.value = converted !== null ? converted.toString() : ''
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

onMounted(() => {
	if (refNumber.value) {
		const input = refNumber.value.querySelector(`#${props.widget.key}`)
		input.onkeypress = (event) => {
			const isNum = event.charCode >= 48 && event.charCode <= 57
			const res = {
				num: isNum,
				dot: event.charCode === 46,
				minus: event.charCode === 45,
			}
			if (event.target.value.includes('.')) delete res.dot
			if (event.target.value.includes('-')) delete res.minus
			return Object.values(res).some((b) => b)
		}

		input.onkeyup = (event) => {
			if (event.keyCode === 38) {
				handleClickIcon('up', true)
				return
			}
			if (event.keyCode === 40) {
				handleClickIcon('down', true)
				return
			}
			const text = event.target.value
			if (!/^-([0-9])?/i.test(text))
				event.target.value = text.replaceAll('-', '')
		}

		input.onpaste = (event) => {
			let text = event?.clipboardData?.getData('Text') || ''
			text = text.replaceAll(',', '')
			if (!/^(-)?[0-9]+((.){1}[0-9]+)?$/i.test(text)) return false
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
