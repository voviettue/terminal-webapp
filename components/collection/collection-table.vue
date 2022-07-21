<!-- eslint-disable vue/no-v-model-argument -->
<template>
	<div>
		<TwTable :headers="headers" :items="items">
			<template #item-actions="{ item }">
				<NuxtLink
					:to="`/songs/${item.id}`"
					class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					View
				</NuxtLink>
			</template>
		</TwTable>
		<TwPagination v-model:page="page" :total-page="pageTotal"></TwPagination>
	</div>
</template>

<script setup lang="ts">
interface Props {
	collection: string
	headers: Record<string, any>[]
	fields: string[]
	limit: number
}

const props = defineProps<Props>()
const directus = useDirectus()
const { items, page, pageTotal, limit, setLimit, setTotalItem, onPageChanged } =
	usePagination()
const meta = ['filter_count']

setLimit(20)
onPageChanged(() => fetchItems())

await fetchItems()

// functions
async function fetchItems() {
	const data = await directus.items(props.collection).readByQuery({
		page: page.value,
		limit: limit.value,
		fields: props.fields,
		meta,
	})
	setTotalItem(data?.meta?.filter_count)
	items.value = data.data
}
</script>
