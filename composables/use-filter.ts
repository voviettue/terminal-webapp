import { Ref } from 'vue'
import { Query } from '@directus/shared/types'
import orderBy from 'lodash/orderBy'

type Sort = {
	key: string
	direction: string
}

interface Filter {
	search: Ref<string>
	filter: Ref<Query['filter']>
	items: Ref<any[]>
	toggleSort: (sort: Sort) => void
}

export const useFilter = (data: Ref<any[]>, columns: Ref<any[]>): Filter => {
	const search: Ref<string> = ref(null)
	const filter: Ref<Query['filter']> = ref(null)
	const items: Ref<any[]> = ref(null)

	const { filterItems } = useUtils()

	function compareObjects(o1: object, o2: object) {
		let k = ''
		for (k in o1) if (o1[k] !== o2[k]) return false
		for (k in o2) if (o1[k] !== o2[k]) return false
		return true
	}

	function flatObject(o: object) {
		function flat(res, key, val, pre = '') {
			const prefix = [pre, key].filter((v) => v).join('.')
			if (typeof val === 'object' && val !== null) {
				return Object.keys(val).reduce(
					(prev, curr) => flat(prev, curr, val[curr], prefix),
					res
				)
			} else {
				return Object.assign(res, { [prefix]: val })
			}
		}

		return Object.keys(o).reduce((prev, curr) => flat(prev, curr, o[curr]), {})
	}

	function itemExists(haystack: any, needle: any) {
		for (let i = 0; i < haystack.length; i++)
			if (compareObjects(haystack[i], needle)) return true
		return false
	}

	function toggleSort(sort: Sort) {
		const columnIndex = columns.value.findIndex(
			(el: any) => el.key === sort.key
		)
		columns.value[columnIndex] = {
			...columns.value[columnIndex],
			sortDirection: sort.direction,
		}
		items.value = orderBy(items.value, [sort.key], [sort.direction])
	}

	watchEffect(() => {
		if (!search.value) {
			items.value = filterItems(data.value, filter.value)
		} else {
			const result: any[] = []
			data.value.forEach((item: object) => {
				const flattedObject = flatObject(item)
				for (const [, value] of Object.entries(flattedObject)) {
					if (
						value &&
						value
							.toString()
							.toLocaleLowerCase()
							.includes(search.value.trim().toLocaleLowerCase())
					) {
						if (!itemExists(result, item)) result.push(item)
					}
				}
			})
			items.value = filterItems(result, filter.value)
		}

		const keys = columns.value.map((el: any) => el.key)
		const directions = columns.value.map((el: any) => el.sortDirection) ?? 'asc'
		items.value = orderBy(items.value, keys, directions)
	})

	return {
		search,
		filter,
		items,
		toggleSort,
	}
}
