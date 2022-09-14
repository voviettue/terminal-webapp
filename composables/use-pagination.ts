import { ref, Ref } from 'vue'

interface Pagination {
	items: Ref<any[]>
	page: Ref<number>
	limit: Ref<number>
	pageTotal: Ref<number>
	totalItem: Ref<number>
	setLimit: (number: number) => void
	setTotalItem: (total: number) => void
	onPageChanged: (fn: () => void) => void
}

export const usePagination = (): Pagination => {
	const items = ref([])
	const page = ref(1)
	const limit = ref(10)
	const pageTotal = ref(0)
	const totalItem = ref(0)
	let handlePageChange: any = null

	watch(page, () => {
		if (handlePageChange) {
			handlePageChange()
		}
	})

	function setLimit(number: number) {
		limit.value = number
		setTotalItem(totalItem.value)
	}

	function setTotalItem(total: number) {
		totalItem.value = total
		pageTotal.value = Math.ceil(total / limit.value)
	}

	function onPageChanged(fn: () => void) {
		handlePageChange = fn
	}

	return {
		items,
		page,
		limit,
		pageTotal,
		totalItem,
		setLimit,
		setTotalItem,
		onPageChanged,
	}
}
