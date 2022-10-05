import { Query } from '@directus/shared/types'
import get from 'lodash/get'
import generateJoi from './generate-joi'

export default function filterItems(
	items: Record<string, any>[],
	filter: Query['filter']
): Record<string, any>[] {
	if (!filter) return items

	return items.filter((item) => {
		return passesFilter(item, filter)
	})

	function passesFilter(
		item: Record<string, any>,
		filter: Query['filter']
	): boolean {
		if (!filter) return true

		if (Object.keys(filter)[0] === '_and') {
			const subFilter = Object.values(filter)[0] as Query['filter'][]

			return subFilter.every((subFilter) => {
				return passesFilter(item, subFilter)
			})
		}

		if (Object.keys(filter)[0] === '_or') {
			const subFilter = Object.values(filter)[0] as Query['filter'][]

			return subFilter.some((subFilter) => {
				return passesFilter(item, subFilter)
			})
		}

		// handle nested field
		const subFilter = Object.values(filter)[0]
		const operator = Object.keys(subFilter)[0]
		if (!String(operator).startsWith('_')) {
			const key = Object.keys(filter)[0]
			return passesFilter(get(item, key, {}), subFilter)
		}

		const schema = generateJoi(filter)

		if (Array.isArray(item)) {
			return item.some((record: any) => {
				const { error } = schema.validate(record)
				return error === undefined
			})
		}

		const { error } = schema.validate(item)
		return error === undefined
	}
}
