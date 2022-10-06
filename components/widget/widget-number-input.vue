<!-- eslint-disable vue/attributes-order -->
<template>
	<div
		:class="[
			'form-number-input',
			alignment === 'right' ? 'align-right' : '',
			leftIcon || rightIcon ? 'has-icon' : '',
			disable ? 'readonly' : '',
			labelPosition !== 'left' ? 'label-top' : 'label-left',
			'w-full',
			tooltip ? 'tooltip' : '',
		]"
		ref="textInput"
	>
		<div :class="getClassLabel()" :style="styleLabel" @click="clickLabel">
			<span>{{ label }}</span>
		</div>
		<div :class="getClassFormKitInput()">
			<FormKit
				v-model="text"
				:type="marked ? 'password' : 'number'"
				:validation="validates"
				:placeholder="placeholder"
				:min="minValue"
				:max="maxValue"
				:name="label"
				validation-visibility="live"
				:validation-messages="errorsMessage"
				@input="onChangeText"
				:input-class="getInputClass"
				:inner-class="getInnerClass"
			>
				<template v-if="leftIcon" #prefixIcon>
					<TwIcon :name="leftIcon" class="mx-2" />
				</template>
				<template v-if="rightIcon" #suffixIcon>
					<TwIcon :name="rightIcon" class="mx-2" />
				</template>
			</FormKit>
		</div>
		<span v-if="tooltip" class="tooltiptext">{{ tooltip }}</span>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, defineEmits } from 'vue'
import { NumberInputWidget } from '~/shared/types'

interface Props {
	widget: NumberInputWidget
}

const emit = defineEmits(['input', 'reset'])
const text: Ref<string> = ref('')
const props: any = defineProps<Props>()
const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
// const options = ref(props.widget.options)
const validates = ref('')
const errorsMessage: Ref<Record<string, any>> = ref({})
const {
	defaultValue,
	required,
	minValue,
	maxValue,
	placeholder,
	leftIcon,
	rightIcon,
	marked,
	disable,
	regex,
	errorMessage,
	label,
	labelPosition,
	alignment,
	labelColor,
	labelSize,
	labelFontFamily,
	labelWidth,
	onChange,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	borderRadius,
	shadow,
	autoFocus,
	reset,
	tooltip,
} = props.widget.options as NumberInputWidget
const textInput = ref(null)
const onChangeText = (val) => {
	emit('input', val)
	if (!onChange) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onChange)
	fn(...Object.values(context))
}

const getInnerClass = () => {
	if ((!leftIcon && !rightIcon) || !shadow) return {}
	const res = {}
	res[`shadow-${shadow}`] = true
	return res
}

const getInputClass = () => {
	if (leftIcon || rightIcon || !shadow) return {}
	const res = {}
	res[`shadow-${shadow}`] = true
	return res
}

const styleLabel = getStyles({
	textColor: labelColor,
	textSize: labelSize,
	textFontFamily: labelFontFamily,
})

const getClassLabel = () => {
	const classes = { 'label-input': true }
	if (labelPosition === 'left') {
		classes[`grid-${labelWidth || 2}`] = true
	}
	return classes
}

const getClassFormKitInput = () => {
	const classes = { 'form-kit-input': true }
	if (labelPosition === 'left') {
		classes[`grid-${6 - labelWidth || 4}`] = true
	}
	return classes
}

const clickLabel = () => {
	const input = textInput.value.querySelector('.formkit-input')
	input.focus()
}

onMounted(() => {
	if (required) {
		validates.value = 'required'
	}
	if (regex) {
		validates.value += `|matches:${new RegExp(regex)}`
		errorsMessage.value.matches = errorMessage
	}
	text.value = defaultValue || ''
	emit('reset', !!reset)
	if (autoFocus || disable) {
		const input = textInput.value.querySelector('.formkit-input')
		autoFocus && input.focus()
		disable && input.setAttribute('readonly', true)
	}
	if (borderRadius) {
		const inner = textInput.value.querySelector('.formkit-inner')
		const input = textInput.value.querySelector('.formkit-input')
		inner.style.borderRadius = `${borderRadius}px`
		if (!leftIcon && !rightIcon) input.style.border = 'none'
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
	&.align-right {
		:deep().formkit-input {
			text-align: right;
		}
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
