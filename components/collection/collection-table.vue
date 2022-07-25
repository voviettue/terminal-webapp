<template>
	<div>
		<slot name="table" :headers="headers" :items="items">
			<TwTable :headers="headers" :items="items" :row-click="rowClick">
				<template v-for="(_, name) in ($slots as {})" #[name]="slotData">
					<slot :name="name" v-bind="slotData || {}" />
				</template>
			</TwTable>
		</slot>
		<TwPagination v-model:page="page" :total-page="pageTotal"></TwPagination>
	</div>
</template>

<script setup lang="ts">
interface Props {
	collection: string
	headers: Record<string, any>[]
	fields: string[]
	limit?: number
	rowClick: (item: any) => void
	filter?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
	limit: 20,
	filter: undefined,
})
const directus = useDirectus()
const { items, page, pageTotal, limit, setLimit, setTotalItem, onPageChanged } =
	usePagination()

setLimit(props.limit)
onPageChanged(() => fetchItems())

await fetchItems()
// functions
async function fetchItems() {
	const data = await directus.items(props.collection).readByQuery({
		page: page.value,
		limit: limit.value,
		fields: props.fields,
		meta: ['filter_count'],
		filter: props.filter,
	})
	setTotalItem(data?.meta?.filter_count)
	items.value = data.data
}
</script>
