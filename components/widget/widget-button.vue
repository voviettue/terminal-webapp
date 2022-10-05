<template>
	<div
		:class="[
			'flex',
			position === 'left'
				? 'justify-start'
				: position === 'right'
				? 'justify-end'
				: 'justify-center',
		]"
	>
		<button
			type="button"
			:class="[
				'btn',
				`${buttonSize || 'sm'}`,
				`${buttonVariant || 'light'}`,
				`shadow-${shadow || 'md'}`,
				outline ? 'outline' : '',
				disable ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
			]"
			:style="{ 'border-radius': borderRadius ? borderRadius + 'px' : '0px' }"
			@click="onButtonClick"
		>
			<TwIcon v-if="leftIcon" :name="leftIcon" class="mr-1" />
			{{ text }}
			<TwIcon v-if="rightIcon" :name="rightIcon" class="ml-1" />
		</button>
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
	outline,
	buttonSize,
	shadow,
	borderRadius,
	onClick,
	disable,
} = (props.widget?.options || {}) as Partial<ButtonWidget>

const { result: text } = useBindData(label, props.widget?.context)

function onButtonClick() {
	if (!onClick) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onClick)
	fn(...Object.values(context))
}
</script>
