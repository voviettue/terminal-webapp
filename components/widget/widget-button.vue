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
			<TwIcon v-if="leftIcon" :name="leftIcon" class="mr-1" />
			{{ label }}
			<TwIcon v-if="rightIcon" :name="rightIcon" class="ml-1" />
		</button>
	</div>
</template>

<script setup lang="ts">
import * as buttonStyle from './button/style.json'
import { ButtonWidget } from '~~/shared/types'

interface Props {
	widget: ButtonWidget
}
const props: any = defineProps<Props>()
// const { getStyles } = useUtils()
// const styles = getStyles(props.widget.options)
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
} = (props.widget?.options || {}) as Partial<ButtonWidget>
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
