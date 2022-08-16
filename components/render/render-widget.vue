<template>
	<component
		:is="`widget-${widget.widget}`"
		:class="`overflow-auto  ${widget.htmlClass ?? ''} width-${widget.width}`"
		:widget="detailsWidget"
	/>
</template>

<script setup lang="ts">
import { Widget } from '~/shared/types'

interface Props {
	widget: Widget
}

const props: any = defineProps<Props>()
const detailsWidget = { ...props.widget, ...props.widget.options }
</script>

<style scoped>
.width-full {
	@apply col-span-6;
}
.width-half {
	@apply col-span-3;
}
.width-1 {
	@apply lg:col-span-1;
}
.width-2 {
	@apply lg:col-span-2;
}
.width-3 {
	@apply lg:col-span-3;
}
.width-4 {
	@apply lg:col-span-4;
}
.width-5 {
	@apply lg:col-span-5;
}
</style>
