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
			]"
			:style="{ 'border-radius': borderRadius ? borderRadius + 'px' : '50%' }"
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
} = (props.widget?.options || {}) as Partial<IconButtonWidget>
</script>
