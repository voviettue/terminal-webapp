<template>
	<div class="lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6">
		<RenderWidget
			v-for="item in items.filter((e) => !e.parent)"
			:key="`widget-${item.id}`"
			:widget="item"
		></RenderWidget>
	</div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { Page } from '~/shared/types'
interface Props {
	params: object | null
	page?: Page
}

const props = defineProps<Props>()

const directus = useDirectus()

const cmsWidgets = directus.items('cms_widgets')

const res = await cmsWidgets.readByQuery({
	filter: { _and: [{ id: { _in: props.page?.widgets } }] },
})
const items: any[] = res.data
	? res.data.sort((a: any, b: any) => (a.sort ?? 1000) - (b.sort ?? 1000))
	: []

provide('widgets', items)
</script>
