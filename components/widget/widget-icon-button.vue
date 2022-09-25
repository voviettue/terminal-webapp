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
				`${buttonVariant || 'light'}`,
				`shadow-${shadow || 'md'}`,
				outline ? 'outline' : '',
				disable ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
			]"
			:style="{ 'border-radius': borderRadius ? borderRadius + 'px' : '50%' }"
			@click="fnClick"
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
// eslint-disable-next-line no-new-func
const fnClick = new Function(onClick || '')
</script>
