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
import { Page, Widget } from '~/shared/types'
interface Props {
	params: object | null
	page?: Page
}

const props = defineProps<Props>()
const directus = useDirectus()
const items = (await fetchWidgets()) as Widget[]

async function fetchWidgets() {
	const cmsWidgets = directus.items('cms_widgets')
	const res = await cmsWidgets.readByQuery({
		filter: { page: props.page.id },
	})

	return res.data
		? res.data.sort((a: any, b: any) => (a.sort ?? 1000) - (b.sort ?? 1000))
		: []
}
provide('widgets', items)
</script>
