<template>
	<div
		v-if="Array.isArray(widget.data)"
		:style="styles"
		:class="`lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6 shadow-${widget?.shadow}`"
	>
		<template v-for="(dataItem, index) in widget.data">
			<RenderWidget
				v-for="childWidget in childWidgets"
				:key="`widget-${index}-${childWidget.id}`"
				:widget="addContext(childWidget, dataItem)"
			></RenderWidget>
		</template>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Widget, ListWidget } from '~/shared/types'

interface Props {
	widget: ListWidget
}

const props = defineProps<Props>()

const widgets: Widget[] = inject('widgets')

const childWidgets = widgets.filter((e) => e.parent === props.widget.id)
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
function addContext(childWidget: Widget, dataItem: any) {
	return { ...childWidget, context: { $item: dataItem } }
}
</script>
