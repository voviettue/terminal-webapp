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
			:id="widget.key"
			v-model="value"
			:name="name"
			type="customInput"
			:input-type="timePrecision ? 'datetime-local' : 'date'"
			:validation="validation.rules"
			:validation-messages="validation.messages"
			:validation-label="label"
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
			:tooltip="tooltip"
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
import { format } from 'date-fns'
import { DatetimeInputWidget } from '~/shared/types'
import { useValidation } from '~/composables/use-validation'
import { convertInputName } from '~~/utils/convert-input-name'

interface Props {
	widget: DatetimeInputWidget
}

const emit = defineEmits(['input'])
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

const formatDateTime = (value: string | number, validationFormat = false) => {
	try {
		switch (timePrecision) {
			case 'hh:mm':
				return format(
					new Date(value),
					`yyyy-MM-dd${validationFormat ? ' ' : "'T'"}HH:mm`
				)
			case 'hh:mm:ss':
				return format(
					new Date(value),
					`yyyy-MM-dd${validationFormat ? ' ' : "'T'"}HH:mm:ss`
				)
			default:
				return format(new Date(value), 'yyyy-MM-dd')
		}
	} catch (e) {
		return null
	}
}

const value = ref(formatDateTime(defaultValue) ?? null)
const name = convertInputName(props.widget.name)

const { result } = useBindData(defaultValue)
watch([result], () => {
	const parsedValue = Date.parse(result.value.replaceAll('"', ''))
	value.value = formatDateTime(parsedValue)
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

const bindValidations = validations.map((el: any) => {
	const { result: bindValue } = useBindData(el.value)
	return {
		...el,
		value: formatDateTime(bindValue.value, true),
	}
})
const { validation } = useValidation(bindValidations, required)

const getClassInput = () => {
	const classes = {}
	if (shadow) classes[`shadow-${shadow}`] = true
	return classes
}

const min = computed(() => {
	return formatDateTime(Date.parse(minDate))
})

const max = computed(() => {
	return formatDateTime(Date.parse(maxDate))
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
