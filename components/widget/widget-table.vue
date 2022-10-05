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
		:min-row="minRow"
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
const { getStyles, parseJson } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const columns = props.widget.columns ?? ([] as TableHeader[])
const styles = getStyles(props.widget.options)
const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)
const data = computed(() => {
	page.value = 1
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
} = props.widget.options

const { items, page, totalItem, limit, setLimit, setTotalItem, onPageChanged } =
	usePagination()

const { search, filter, items: filteredItems } = useFilter(data)
function updateFilter(value: any) {
	filter.value = value
}

watch([filteredItems], () => {
	items.value = filteredItems.value

	if (pagination) {
		initItems()
		setTotalItem(filteredItems.value.length)
		setLimit(parseInt(itemPerPage))
		onPageChanged(() => {
			initItems()
		})
	}
})

const minRow = computed(() => {
	if (pagination) {
		return page.value > 1 || search || filter ? limit : null
	} else {
		return filteredItems.value ? filteredItems.value.length : 0
	}
})

function initItems() {
	const offset = (page.value - 1) * limit.value
	items.value = filteredItems.value.slice(offset, offset + limit.value)
}

function onRowClick(item) {
	const context = { ...pageStore.context, $item: item }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onRowClick)
	fn(...Object.values(context), navigateTo)
}
</script>
