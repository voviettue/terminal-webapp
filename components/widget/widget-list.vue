<template>
	<div
		v-if="Array.isArray(data)"
		:style="styles"
		:class="`lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6 shadow-${widget?.shadow}`"
	>
		<template v-for="(dataItem, index) in data">
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

const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const childWidgets = widgets.filter((e) => e.parent === props.widget.id)
const styles = getStyles(props.widget.options)
let data = []
try {
	data =
		JSON.parse(
			renderTemplate(props.widget?.data, {
				...pageStore.context,
				...props.widget?.context,
			})
		) ?? []
} catch {}

function addContext(childWidget: Widget, dataItem: any) {
	return { ...childWidget, context: { $item: dataItem } }
}
</script>
