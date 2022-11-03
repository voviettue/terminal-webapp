<template>
	<div :class="buttonClass">
		<FormKit
			type="customButton"
			:disabled="disabled"
			:variant="buttonVariant"
			:size="buttonSize"
			:tooltip="tooltip"
			:style="{
				borderRadius: borderRadius || '0px',
			}"
			:class="[`shadow-${shadow || null}`, 'icon']"
			:button-type="buttonType"
			@click="onButtonClick"
		>
			<TwIcon :name="icon"></TwIcon>
		</FormKit>
	</div>
</template>

<script setup lang="ts">
import { IconButtonWidget } from '~~/shared/types'
interface Props {
	widget: IconButtonWidget
}
const props: any = defineProps<Props>()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const {
	icon,
	buttonVariant,
	position,
	buttonSize,
	shadow,
	borderRadius,
	onClick,
	disabled,
	buttonType,
	tooltip,
} = (props.widget?.options || {}) as Partial<IconButtonWidget>

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
