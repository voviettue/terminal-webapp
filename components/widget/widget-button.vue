<template>
	<div :class="buttonClass">
		<FormKit
			type="customButton"
			:disabled="disabled"
			:left-icon="leftIcon"
			:right-icon="rightIcon"
			:variant="buttonVariant"
			:size="buttonSize"
			:tooltip="tooltip"
			:style="{
				borderRadius: borderRadius || '0px',
			}"
			:class="[`shadow-${shadow || null}`]"
			:button-type="buttonType"
			@click="onButtonClick"
		>
			{{ text }}
		</FormKit>
	</div>
</template>

<script setup lang="ts">
import { ButtonWidget } from '~~/shared/types'

interface Props {
	widget: ButtonWidget
}
const props: any = defineProps<Props>()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const {
	rightIcon,
	leftIcon,
	label,
	buttonVariant,
	position,
	buttonSize,
	shadow,
	borderRadius,
	onClick,
	disabled,
	buttonType,
	tooltip,
} = (props.widget?.options || {}) as Partial<ButtonWidget>

const { result: text } = useBindData(label, props.widget?.context)

const buttonClass = [
	'w-full',
	'flex',
	position === 'left'
		? 'justify-start'
		: position === 'right'
		? 'justify-end'
		: 'justify-center',
]

function onButtonClick() {
	if (!onClick) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onClick)
	fn(...Object.values(context))
}
</script>
