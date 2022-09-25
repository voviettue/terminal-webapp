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
				'btn',
				`${buttonSize || 'sm'}`,
				`${buttonVariant || 'light'}`,
				`shadow-${shadow || 'md'}`,
				outline ? 'outline' : '',
				disable ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
			]"
			:style="{ 'border-radius': borderRadius ? borderRadius + 'px' : '5px' }"
			@click="fnClick"
		>
			<TwIcon v-if="leftIcon" :name="leftIcon" class="mr-1" />
			{{ label }}
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
	onClick,
	disable,
} = (props.widget?.options || {}) as Partial<ButtonWidget>
// eslint-disable-next-line no-new-func
const fnClick = new Function(onClick || '')
</script>
