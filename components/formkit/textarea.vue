<template>
	<TwTextarea
		:id="context?.id"
		:name="context.node.name"
		:model-value="context._value"
		:placeholder="context.placeholder"
		:autocomplete="context.autocomplete"
		:readonly="context.readonly"
		:disabled="context.disabled"
		:show-work-limit="context.showWorkLimit"
		:style="context.style"
		:autofocus="context.autofocus"
		:class="context.class"
		:tooltip="context.tooltip"
		@change="handleChange"
		@blur="handleBlur"
		@update:model-value="updateValue"
		@focus="handleFocus"
	>
		<template v-for="[s, v] in Object.entries(slots)" #[s]>
			<component
				:is="node"
				v-for="(node, index) in v()"
				:key="`node_${index}`"
			></component>
		</template>
	</TwTextarea>
</template>
<script setup lang="ts">
interface Props {
	context: any
}
const props = withDefaults(defineProps<Props>(), {})
const handleChange = ($event) => {
	if (typeof props.context.attrs.onChange === 'function')
		props.context.attrs.onChange($event)
}
const handleBlur = ($event) => {
	if (typeof props.context.attrs.onBlur === 'function')
		props.context.attrs.onBlur($event)
}
const handleFocus = ($event) => {
	if (typeof props.context.attrs.onFocus === 'function')
		props.context.attrs.onFocus($event)
}

const slots = props.context.slots as Record<string, () => any>
function updateValue(value) {
	props.context.node.input(value)
}
</script>
