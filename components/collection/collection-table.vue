<template>
	<div>
		<slot name="table" :headers="headers" :items="items">
			<TwTable :headers="headers" :items="items">
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
	limit: number
}

const props = defineProps<Props>()
const directus = useDirectus()
const { items, page, pageTotal, limit, setLimit, setTotalItem, onPageChanged } =
	usePagination()

setLimit(20)
onPageChanged(() => fetchItems())

await fetchItems()

// functions
async function fetchItems() {
	const data = await directus.items(props.collection).readByQuery({
		page: page.value,
		limit: limit.value,
		fields: props.fields,
		meta: ['filter_count'],
	})
	setTotalItem(data?.meta?.filter_count)
	items.value = data.data
}
</script>
