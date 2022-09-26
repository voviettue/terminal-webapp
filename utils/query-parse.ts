import { Query } from '~/shared/types'

export function parseQuery(query: Query) {
	try {
		switch (query.query) {
			case 'js-object':
				// eslint-disable-next-line no-new-func
				return new Function(`return ${query.output}`)() || null
			case 'api':
			case 'item':
			case 'json':
			case 'items':
				return JSON.parse(query.output) || null
			default:
				return query.output
		}
	} catch {
		return null
	}
}
