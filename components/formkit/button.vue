<template>
	<TwButton
		:variant="context.variant"
		:disabled="context.disabled"
		:class="context.class"
		:tooltip="context.tooltip"
		:size="context.size"
		:type="context.buttonType"
		:left-icon="context.leftIcon"
		:right-icon="context.rightIcon"
		:text="context.text"
		:style="context.style"
		@click="handleClick"
	>
		{{ context.text ? '' : context.slots.default()?.[0].children }}
	</TwButton>
</template>
<script setup lang="ts">
interface Props {
	context: any
}

const props = withDefaults(defineProps<Props>(), {})
const handleClick = ($event) => {
	if (typeof props.context.attrs.onClick === 'function')
		props.context.attrs.onClick($event)
}
</script>
