<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<template v-if="activeSearch || activeFilter">
		<FormFilter
			v-model:search="search"
			:fields="columns"
			:active-search="activeSearch"
			:active-filter="activeFilter"
			:filter="filter"
			@update:filter="updateFilter"
		></FormFilter>
	</template>
	<TwTable
		:headers="columns"
		:items="items"
		:row-click="widget?.onRowClick ? onRowClick : null"
		:styles="styles"
		:shadow="shadow"
		:vertical-lines="verticalLines"
		:striped-row="strippedRow"
		:sortable="sortable"
		:layout="layout"
		:height="height"
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
const { getStyles, parseJson } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const columns = ref(props.widget.columns ?? ([] as TableHeader[]))
const styles = getStyles(props.widget.options)
const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)
const data = computed(() => {
	return parseJson(rawData.value, [])
})

const {
	activeSearch,
	activeFilter,
	pagination,
	itemPerPage,
	shadow,
	verticalLines,
	strippedRow,
	sortable,
	layout,
	height,
} = props.widget.options

const { search, filter, items: filteredItems } = useFilter(data)

function updateFilter(value: any) {
	filter.value = value
}

const { items, page, totalItem, limit } = usePagination(filteredItems, {
	limit: itemPerPage ? parseInt(itemPerPage) : undefined,
	page: 1,
})

// const minRow = computed(() => {
// 	if (height) return null;
// 	if (pagination) {
// 		return page.value > 1 || search.value || filter.value ? limit.value : null
// 	}
// 	return filteredItems.value ? filteredItems.value.length : 0
// })

watch(filteredItems, () => {
	page.value = 1
})

function onRowClick(item) {
	const context = { ...pageStore.context, $item: item }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onRowClick)
	fn(...Object.values(context), navigateTo)
}
</script>
