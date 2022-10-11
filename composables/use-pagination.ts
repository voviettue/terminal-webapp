import { ref, Ref } from 'vue'

interface Pagination {
	items: Ref<any[]>
	page: Ref<number>
	limit: Ref<number>
	pageTotal: Ref<number>
	totalItem: Ref<number>
}
interface PaginationOption {
	limit?: number
	page?: number
}

export const usePagination = (
	data: Ref<Record<string, any>[]>,
	options: PaginationOption
): Pagination => {
	const items = ref([])
	const page = ref<number>(options.page || 10)
	const limit = ref<number>(options.limit || 10)
	const pageTotal = ref()
	const totalItem = ref(0)

	watchEffect(() => {
		totalItem.value = data.value.length
		pageTotal.value = Math.ceil(totalItem.value / limit.value)
		const offset = (page.value - 1) * limit.value
		items.value = data.value.slice(offset, offset + limit.value)
	})

	return {
		items,
		page,
		limit,
		pageTotal,
		totalItem,
	}
}
