<template>
	<div
		:class="`lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6 mx-auto content-start ${
			shadow ? `shadow-${shadow}` : ''
		}`"
		:style="styles"
	>
		<RenderWidget
			v-for="item in items"
			:key="`widget-${item.id}`"
			:widget="addContext(item, widget?.context)"
		></RenderWidget>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Widget, ContainerWidget } from '~~/shared/types'

interface Props {
	widget: ContainerWidget
}

const props = defineProps<Props>()
const { getStyles } = useUtils()

const widgets: Widget[] = inject('widgets')
const options = props.widget.options
const { shadow } = options
const items = widgets.filter((e) => e.parent === props.widget.id)
const styles = getStyles(options)

function addContext(childWidget: Widget, context: any) {
	return { ...childWidget, context }
}
</script>
