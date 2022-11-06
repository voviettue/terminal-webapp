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
			type="customTextarea"
			:validation="validation.rules"
			:validation-messages="validation.messages"
			validation-visibility="dirty"
			:validation-label="label"
			:show-work-limit="showWorkLimit"
			:placeholder="placeholder"
			:readonly="readonly"
			:prefix-icon="prefixIcon"
			:suffix-icon="suffixIcon"
			:autofocus="autofocus"
			:tooltip="tooltip"
			:disabled="disabled"
			:class="getClassInput()"
			:style="{
				borderRadius: borderRadius ?? undefined,
			}"
			inner-class="relative"
			:help="helpText"
			@input="onChangeText"
		></FormKit>
	</FormField>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { TextareaInput } from '~/shared/types'
import { useValidation } from '~/composables/use-validation'
import { convertInputName } from '~~/utils/convert-input-name'

interface Props {
	widget: TextareaInput
}

const emit = defineEmits(['input'])
const props: any = defineProps<Props>()
const {
	defaultValue = '',
	required,
	validations = [],
	placeholder,
	prefixIcon,
	suffixIcon,
	trim,
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
	autofocus,
	tooltip,
	hideLabel,
	readonly,
	helpText,
	labelFontStyle,
	showWorkLimit,
} = props.widget.options as TextareaInput

const value = ref(defaultValue)
const name = convertInputName(props.widget.name)

const { result } = useBindData(defaultValue as string)
watch([result], () => {
	value.value = result.value
})

const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

watch(value, (newValue: string) => {
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
</script>
