<template>
	<div
		ref="select"
		:class="[
			'form-select-input',
			alignment === 'right' ? 'align-right' : '',
			labelPosition !== 'left' ? 'label-top' : 'label-left',
			'w-full',
		]"
	>
		<div :class="getClassLabel()" :style="styleLabel">
			<span>{{ label }}</span>
		</div>
		<div :class="getClassFormKitInput()">
			<FormKit
				v-model="text"
				type="dropdown"
				:validation="validates"
				:placeholder="placeholder"
				:options="choices"
				:name="label"
				:disabled="disable"
				:allow-search="allowSearching"
				validation-visibility="live"
				:wrapper-class="getWrapperClass"
				inner-class="!border-none"
				@input="onChangeText"
			></FormKit>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, defineEmits } from 'vue'
import { SelectWidget } from '~/shared/types'

interface Props {
	widget: SelectWidget
}

const emit = defineEmits(['input', 'reset'])
const props: any = defineProps<Props>()
const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
// const options = ref(props.widget.options)
const validates = ref('')
const {
	defaultValue,
	required,
	placeholder,
	disable,
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
	allowOther,
	allowSearching,
	choices,
} = props.widget.options as SelectWidget
const text: Ref<string | number> = ref(defaultValue)
const onChangeText = (val) => {
	emit('input', val)
	if (!onChange) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onChange)
	fn(...Object.values(context))
}

const getWrapperClass = () => {
	const res = { 'border-none': true }
	if (!shadow) return res

	res[`shadow-${shadow}`] = true
	return res
}

const styleLabel = getStyles({
	textColor: labelColor,
	textSize: labelSize,
	fontFamily: labelFontFamily,
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

const select = ref(null)

onMounted(() => {
	choices.unshift({
		text: 'Select',
		value: null,
	})
	if (allowOther && !choices.find((_) => _.value === 'other'))
		choices.push({
			text: 'Other',
			value: 'other',
		})
	if (!required) {
		validates.value = 'required'
	}
	if (borderRadius) {
		const input = select.value.querySelector('.input-select')
		input.style.borderRadius = `${borderRadius}px`
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
