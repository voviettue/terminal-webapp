<template>
	<div v-tooltip="tooltip" :class="divClass">
		<button
			type="button"
			:disabled="disabled"
			:class="buttonClass"
			@click="emit('click')"
		>
			<slot name="left-icon" class="pr-2">
				<div v-if="leftIcon" class="text-xl flex items-center">
					<TwIcon :name="leftIcon" class="pr-2 h-max opacity-70"></TwIcon>
				</div>
			</slot>

			{{ text }}
			<slot></slot>
			<slot name="right-icon" class="pl-2">
				<div v-if="rightIcon" class="text-xl flex items-center">
					<TwIcon :name="rightIcon" class="pl-2 h-max opacity-70"></TwIcon>
				</div>
			</slot>
		</button>
	</div>
</template>
<script setup lang="ts">
interface Props {
	variant?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'light'
		| 'dark'
	type?: 'solid' | 'outline' | 'link' | 'ghost'
	disabled?: boolean
	leftIcon?: string
	rightIcon?: string
	size?: string
	tooltip?: string
	text?: string
}
const props = withDefaults(defineProps<Props>(), {
	variant: 'primary',
	disabled: false,
	rightIcon: undefined,
	leftIcon: undefined,
	type: 'solid',
	size: 'md',
	tooltip: '',
	text: '',
})
const getTypeButton = () => {
	const text = props.variant
	if (props.type === 'solid') return text
	return `${text}-${props.type}`
}
const divClass = ['flex', 'justify-start', 'items-center', 'overflow-hidden']
const buttonClass = [
	'btn',
	`${props.size}`,
	`${getTypeButton()}`,
	props.disabled ? 'disabled' : '',
]

const emit = defineEmits(['click'])
</script>
