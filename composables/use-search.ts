import { ref, Ref } from 'vue'

interface Search {
	search: Ref<any>
	searchFor: (data: any[], toSearch: Ref<string>) => any[]
}

export const useSearch = (): Search => {
	const search: Ref<any> = ref(null)

	function compareObjects(o1: object, o2: object) {
		let k = ''
		for (k in o1) if (o1[k] !== o2[k]) return false
		for (k in o2) if (o1[k] !== o2[k]) return false
		return true
	}

	function flatObject(o: object) {
		function flat(res, key, val, pre = '') {
			const prefix = [pre, key].filter((v) => v).join('.')
			return typeof val === 'object'
				? Object.keys(val).reduce(
						(prev, curr) => flat(prev, curr, val[curr], prefix),
						res
				  )
				: Object.assign(res, { [prefix]: val })
		}

		return Object.keys(o).reduce((prev, curr) => flat(prev, curr, o[curr]), {})
	}

	function itemExists(haystack: any, needle: any) {
		for (let i = 0; i < haystack.length; i++)
			if (compareObjects(haystack[i], needle)) return true
		return false
	}

	function searchFor(data: any[], toSearch: Ref<any>) {
		const result: any[] = []
		data.forEach((item: object) => {
			const flattedObject = flatObject(item)
			for (const [, value] of Object.entries(flattedObject)) {
				if (
					value &&
					value
						.toString()
						.toLocaleLowerCase()
						.includes(toSearch.value.trim().toLocaleLowerCase())
				) {
					if (!itemExists(result, item)) result.push(item)
				}
			}
		})

		return result
	}

	return {
		search,
		searchFor,
	}
}
