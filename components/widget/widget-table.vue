<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<TwTable
		:headers="columns"
		:items="items"
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
			renderTemplate(props.widget?.data, {
				...pageStore.context,
				...props.widget?.context,
			})
		) ?? []
} catch {}
// pagination
const { pagination, itemPerPage, shadow, verticalLines, strippedRow } =
	props.widget.options
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

	if (page.value > 1) {
		// while (items.value.length < limit.value) {
		// 	items.value.push({})
		// }
	}
}
</script>
