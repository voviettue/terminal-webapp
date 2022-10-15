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
		:headers="headers"
		:items="items"
		:row-click="widget?.onRowClick ? onRowClick : null"
		:styles="styles"
		:shadow="shadow"
		:vertical-lines="verticalLines"
		:striped-row="strippedRow"
		:layout="layout"
		:height="height"
		@toggle-sort="toggleSort($event)"
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
import uniqueId from 'lodash/uniqueId'
import { TableHeader } from '~~/shared/types'

interface Props {
	widget: any
}

const props = defineProps<Props>()
const { getStyles, parseJson } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const widget = props.widget
const columns = ref(props.widget.columns ?? ([] as TableHeader[]))
const styles = getStyles(props.widget.options)
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

const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)

const headers = computed(() => {
	return columns.value
		.filter((column: any) => column?.hidden !== true)
		.map((column) => {
			return {
				key: column?.key || uniqueId('undefined-'),
				label: column?.label,
				tooltip: column?.tooltip,
				sortable: !!sortable && !!column?.key,
				display: column?.display,
				displayOptions: column?.displayOptions,
				thClass: {
					'bg-white': true,
				},
				tdClass: {
					'whitespace-nowrap': column?.columnWrapping !== true,
					'whitespace-pre-wrap': column?.columnWrapping === true,
				},
				thStyle: {
					background: widget?.headerBackground,
					color: widget?.headerColor,
					width: column?.width,
				},
				tdStyle: getStyles(column),
			}
		}) as TableHeader[]
})

const data = computed(() => {
	return parseJson(rawData.value, [])
})

const { search, filter, items: filteredItems } = useFilter(data)
const { toggleSort, items: sortedItems } = useSort(filteredItems, columns)
const { items, page, totalItem, limit } = usePagination(sortedItems, {
	limit: itemPerPage ? parseInt(itemPerPage) : undefined,
	page: 1,
})

function updateFilter(value: any) {
	filter.value = value
}

watch(sortedItems, () => {
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
