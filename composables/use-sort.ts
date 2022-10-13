import { Ref } from 'vue'
import orderBy from 'lodash/orderBy'

type Sort = {
	key: string
	direction: string
}

interface Sortable {
	items: Ref<any[]>
	toggleSort: (sort: Sort) => void
}

export const useSort = (data: Ref<any[]>, columns: Ref<any[]>): Sortable => {
	const items: Ref<any[]> = ref(null)

	function toggleSort(sort: Sort) {
		items.value = orderBy(data.value, [sort.key], [sort.direction])
	}

	watchEffect(() => {
		const keys = columns.value.map((el: any) => el.key)
		const directions = columns.value.map((el: any) => el.sortDirection)
		items.value = orderBy(data.value, keys, directions)
	})

	return {
		items,
		toggleSort,
	}
}
