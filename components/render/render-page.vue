<template>
	<div
		id="page-body"
		class="lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6"
	>
		<template v-if="loaded === false">
			<RenderSkeleton
				v-for="item in items.filter((e) => !e.parent)"
				:key="`skeleton-${item.id}`"
				:widget="item"
			></RenderSkeleton>
		</template>
		<template v-else>
			<RenderWidget
				v-for="item in items.filter((e) => !e.parent)"
				:key="`widget-${item.id}`"
				:widget="item"
			></RenderWidget>
		</template>
	</div>
</template>

<script setup lang="ts">
import { provide, onMounted } from 'vue'
import { Page, Widget } from '~/shared/types'
interface Props {
	params: object | null
	page?: Page
}

const props = defineProps<Props>()
const directus = useDirectus()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const items = (await fetchWidgets()) as Widget[]
const loaded = ref(false)
updateRouteParams()
provide('widgets', items)

onMounted(async () => {
	await pageStore.initContext(items)
	loaded.value = true
})

async function fetchWidgets() {
	const cmsWidgets = directus.items('cms_widgets')
	const res = await cmsWidgets.readByQuery({
		filter: {
			page: props.page.id,
			hidden: { _neq: true },
		},
	})

	return res.data
		? res.data.sort((a: any, b: any) => (a.sort ?? 1000) - (b.sort ?? 1000))
		: []
}

function updateRouteParams() {
	const route = useRoute()
	delete route.params.endpoint
	Object.keys(props.params).forEach((key) => {
		route.params[key] = props.params[key]
	})
}
</script>

<style scoped>
#page-body :deep(.width-full) {
	@apply col-span-6;
}
#page-body :deep(.width-half) {
	@apply col-span-3;
}
#page-body :deep(.width-1) {
	@apply lg:col-span-1;
}
#page-body :deep(.width-2) {
	@apply lg:col-span-2;
}
#page-body :deep(.width-3) {
	@apply lg:col-span-3;
}
#page-body :deep(.width-4) {
	@apply lg:col-span-4;
}
#page-body :deep(.width-5) {
	@apply lg:col-span-5;
}
</style>
