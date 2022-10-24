<template>
	<div :class="['flex', 'justify-start', 'items-center']">
		<button :disabled="disabled" :class="buttonClass" @click="emit('click')">
			<TwIcon v-if="leftIcon" :name="leftIcon" class="mr-1" />
			<slot v-else name="leftIcon"></slot>
			{{ text }}
			<slot></slot>
			<TwIcon v-if="rightIcon" :name="rightIcon" class="ml-1" />
			<slot v-else name="rightIcon"></slot>
		</button>
	</div>
</template>
<script setup lang="ts">
interface Props {
	text?: string
	variant: string
	disabled?: boolean
	rightIcon?: string
	leftIcon?: string
	shadow?: string
	type?: string
	size?: string
}
const props = withDefaults(defineProps<Props>(), {
	text: '',
	variant: 'primary',
	disabled: false,
	rightIcon: undefined,
	leftIcon: undefined,
	shadow: undefined,
	type: 'solid',
	size: 'md',
})
const getTypeButton = () => {
	const text = props.variant
	if (props.type === 'solid') return text
	return `${text}-${props.type}`
}
const buttonClass = [
	'btn',
	`${props.size}`,
	`${getTypeButton()}`,
	`shadow-${props.shadow}`,
	props.disabled ? 'disabled' : '',
]

const emit = defineEmits(['click'])
</script>
<style scoped>
@import './style.scss';
</style>
