<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<template v-if="activeSearch || activeFilter">
		<TwSearch
			v-model:search="search"
			v-model:filter="filter"
			:fields="columns"
			:active-search="activeSearch"
			:active-filter="activeFilter"
		></TwSearch>
	</template>
	<TwTable
		:headers="columns"
		:items="items"
		:row-click="widget?.onRowClick ? onRowClick : null"
		:min-row="page > 1 ? limit : null"
		:styles="styles"
		:shadow="shadow"
		:vertical-lines="verticalLines"
		:striped-row="strippedRow"
	></TwTable>
	<template v-if="pagination && items.length > 0">
		<TwPagination
			v-model:page="page"
			class="pt-4"
			:total="totalItem"
			:limit="limit"
		></TwPagination>
	</template>
</template>

<script setup lang="ts">
import { TableHeader } from '~~/shared/types'

interface Props {
	widget: any
}
const props = defineProps<Props>()
const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const columns = props.widget.columns ?? ([] as TableHeader[])
const styles = getStyles(props.widget.options)
let data = []
try {
	data =
		JSON.parse(
			await renderTemplate(props.widget?.data, {
				...pageStore.context,
				...props.widget?.context,
			})
		) ?? []
} catch {}
const {
	activeSearch,
	activeFilter,
	pagination,
	itemPerPage,
	shadow,
	verticalLines,
	strippedRow,
} = props.widget.options
const { items, page, totalItem, limit, setLimit, setTotalItem, onPageChanged } =
	usePagination()

if (pagination) {
	setTotalItem(data.length)
	setLimit(parseInt(itemPerPage))
	initItems()
	onPageChanged(() => {
		initItems()
	})
} else {
	items.value = data
}

function initItems() {
	const offset = (page.value - 1) * limit.value
	items.value = data.slice(offset, offset + limit.value)
}

const { search, filter, searchFor } = useSearch()

watch([search, filter], () => {
	items.value = searchFor(data, search, filter)
})

function onRowClick(item) {
	const context = { ...pageStore.context, $item: item }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onRowClick)
	fn(...Object.values(context), navigateTo)
}
</script>
