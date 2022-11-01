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
		<template v-for="[s, v] in Object.entries(slots)" #[s]>
			<component
				:is="node"
				v-for="(node, index) in v()"
				:key="`node_${index}`"
			></component>
		</template>
	</TwButton>
</template>
<script setup lang="ts">
interface Props {
	context: any
}

const props = withDefaults(defineProps<Props>(), {})
const slots = props.context.slots as Record<string, () => any>
const handleClick = ($event) => {
	if (typeof props.context.attrs.onClick === 'function')
		props.context.attrs.onClick($event)
}
</script>
