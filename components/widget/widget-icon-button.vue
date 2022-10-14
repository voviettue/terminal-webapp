<template>
	<div
		:class="[
			'flex',
			'py-4',
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
				'btn icon',
				`${buttonSize || 'sm'}`,
				`${buttonVariant || 'primary'}${outline ? '-outline' : ''}`,
				`shadow-${shadow || 'md'}`,
				disable ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
			]"
			:style="{ 'border-radius': (borderRadius || 0) + 'px' }"
			@click="onButtonClick"
		>
			<TwIcon :name="icon" />
		</button>
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
	outline,
	buttonSize,
	shadow,
	borderRadius,
	onClick,
	disable,
} = (props.widget?.options || {}) as Partial<IconButtonWidget>

function onButtonClick() {
	if (!onClick) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onClick)
	fn(...Object.values(context))
}
</script>
