<template>
	<div class="lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6">
		<RenderWidget
			v-for="item in items"
			:key="`widget-${item.id}`"
			:widget="item"
		></RenderWidget>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Widget, BoxWidget } from '~~/shared/types'

interface Props {
	widget: BoxWidget
}

const props = defineProps<Props>()

const widgets: Widget[] = inject('widgets')
const items = widgets.filter((e) => e.parent === props.widget.id)
</script>
