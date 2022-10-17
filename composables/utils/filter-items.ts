import { Query } from '@directus/shared/types'
import get from 'lodash/get'
import generateJoi from './generate-joi'

/*
 Note: Filtering is normally done through SQL in run-ast. This function can be used in case an already
 existing array of items has to be filtered using the same filter syntax as used in the ast-to-sql flow
 */

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
			const subfilter = Object.values(filter)[0] as Query['filter'][]

			return subfilter.every((subFilter) => {
				return passesFilter(item, subFilter)
			})
		}

		if (Object.keys(filter)[0] === '_or') {
			const subfilter = Object.values(filter)[0] as Query['filter'][]

			return subfilter.some((subFilter) => {
				return passesFilter(item, subFilter)
			})
		}

		// handle nested field
		const subfilter = Object.values(filter)[0]
		const operator = Object.keys(subfilter)[0]
		if (!String(operator).startsWith('_')) {
			const key = Object.keys(filter)[0]
			return passesFilter(get(item, key, {}), subfilter)
		}

		const schema = generateJoi(filter)

		if (Array.isArray(item)) {
			return item.some((record: any) => {
				const { error } = schema.validate(record)
				// console.log({ error, filter, item });
				return error === undefined
			})
		}

		const { error } = schema.validate(item)
		// console.log({ error, filter, item });
		return error === undefined
	}
}
