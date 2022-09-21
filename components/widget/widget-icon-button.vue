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
			class="flex justify-center items-center"
			:class="getStyleButton()"
		>
			<TwIcon :name="icon" class="mr-1" />
		</button>
	</div>
</template>

<script setup lang="ts">
import * as buttonStyle from './button/style.json'
import { IconButtonWidget } from '~~/shared/types'
interface Props {
	widget: IconButtonWidget
}
const props: any = defineProps<Props>()
const {
	icon,
	buttonVariant,
	position,
	outline,
	buttonSize,
	shadow,
	borderRadius,
} = (props.widget?.options || {}) as Partial<IconButtonWidget>
const getStyleButton = () => {
	const color = buttonStyle.color[outline ? 'outline' : 'normal'][buttonVariant]
	const size = buttonStyle.size[buttonSize || 'sm']
	return [
		color,
		size,
		`shadow-${shadow || 'md'}`,
		`rounded-${borderRadius ? `[${borderRadius}px]` : 'full'}`,
	].join(' ')
}
</script>
