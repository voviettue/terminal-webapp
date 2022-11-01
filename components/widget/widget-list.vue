<template>
	<div
		v-if="Array.isArray(data)"
		:style="styles"
		:class="`lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6 shadow-${widget?.shadow}`"
	>
		<template v-for="(dataItem, index) in data">
			<RenderWidget
				v-for="(childWidget, key) in childWidgets"
				:key="`widget-item-${index}-${key}-${Math.random()}`"
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

const { getStyles, parseJson } = useUtils()

const childWidgets = widgets.filter((e) => e.parent === props.widget.id)
const styles = getStyles(props.widget.options)

const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)
const data = computed(() => {
	return parseJson(rawData.value, [])
})

function addContext(childWidget: Widget, dataItem: any) {
	return { ...childWidget, context: { $item: dataItem } }
}
</script>
