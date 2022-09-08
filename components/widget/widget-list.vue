<template>
	<div :style="styles" :class="`shadow-${widget?.shadow}`">
		<div
			v-for="(json, index) in widget.data"
			:key="index"
			:class="`lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6`"
			:style="{ padding: widget?.itemSpacing + 'px' }"
		>
			<RenderWidget
				v-for="item in items"
				:key="`widget-${item.id}`"
				:widget="item"
			></RenderWidget>
		</div>
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

const items = widgets.filter((e) => e.parent === props.widget.id)
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
</script>
