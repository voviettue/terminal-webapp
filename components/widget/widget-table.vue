<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<TwTable :headers="columns" :items="items" :style="styles"></TwTable>
	<template v-if="pagination">
		<TwPagination v-model:page="page" :total-page="pageTotal"></TwPagination>
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
const { pagination, itemPerPage } = props.widget.options
const { items, page, pageTotal, limit, setLimit, setTotalItem, onPageChanged } =
	usePagination()

if (pagination) {
	setTotalItem(data.length)
	setLimit(itemPerPage ?? 10)
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
</script>
