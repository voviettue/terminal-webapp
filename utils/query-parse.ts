import { Query } from '~/shared/types'

export function queryParse(query: Query) {
	if (isJson(query.output)) return JSON.parse(query.output)

	// eslint-disable-next-line no-new-func
	if (isFunction(query.output)) return new Function(`return ${query.output}`)()

	return query.output
}

function isJson(data: string) {
	try {
		JSON.parse(data)
		return true
	} catch {
		return false
	}
}

function isFunction(data: string) {
	try {
		// eslint-disable-next-line no-new-func
		const fn = new Function(`return ${data}`)
		return !!fn
	} catch {
		return false
	}
}
