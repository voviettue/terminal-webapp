<template>
	<FormField
		:label="label"
		:label-position="labelPosition"
		:label-alignment="alignment"
		:hide-label="hideLabel"
		:label-width="labelWidth"
		:label-style="styleLabel"
	>
		<div ref="selectRef">
			<FormKit
				v-model="value"
				:name="name"
				type="dropdown"
				:validation="validation.rules"
				:validation-messages="validation.messages"
				:placeholder="placeholder"
				:options="choices"
				:disabled="disabled"
				inner-class="!border-none"
				:help="helpText"
				:class="classDropDown()"
				:style="{
					borderRadius: borderRadius,
				}"
				:icon="icon"
				@input="onChangeText"
			></FormKit>
		</div>
	</FormField>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, defineEmits } from 'vue'
import { SelectWidget } from '~/shared/types'
import { convertInputName } from '~~/utils/convert-input-name'

interface Props {
	widget: SelectWidget
}

const emit = defineEmits(['input', 'reset'])
const props: any = defineProps<Props>()
const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
// const options = ref(props.widget.options)
const {
	defaultValue,
	required,
	placeholder,
	disabled,
	label,
	labelPosition,
	alignment,
	labelColor,
	labelSize,
	labelFontFamily,
	labelFontStyle,
	labelWidth,
	onChange,
	borderRadius,
	shadow,
	allowOther,
	allowSearching,
	hideLabel,
	choices,
	allowNone,
	validations = [],
	helpText,
	icon,
} = props.widget.options as SelectWidget
const value: Ref<string | number> = ref(defaultValue)
const { validation } = useValidation(validations, required)

const { result } = useBindData(defaultValue as string)
watch([result], () => {
	value.value = result.value
})

const name = convertInputName(props.widget.name)

const onChangeText = (val) => {
	emit('input', val)
	if (!onChange) return
	const context = { ...pageStore.context, ...props.widget.context }
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

const selectRef = ref(null)

const classDropDown = () => {
	const classes = {}
	classes[`shadow-${shadow || null}`] = true
	return classes
}

onMounted(() => {
	if (allowNone && !choices.find((_) => _.value === null))
		choices.unshift({
			text: 'Select',
			value: null,
		})
	if (allowOther && !choices.find((_) => _.value === 'other'))
		choices.push({
			text: 'Other',
			value: 'other',
		})
	if (selectRef.value && !allowSearching) {
		const input: HTMLElement = selectRef.value.querySelector('.input-select')
		input.setAttribute('readonly', 'readonly')
	}
})
</script>
<style lang="scss" scoped>
.form-select-input {
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
