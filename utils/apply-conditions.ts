import { TextWidget } from '~~/shared/types'

interface Condition {
	operator: string
	value: any
}

export function applyConditions(item: TextWidget, valueCompare: any) {
	if (Array.isArray(item?.condition)) {
		const conditions: any = item.condition
		const matchedCondition = conditions.find((condition) =>
			matchCondition(condition, valueCompare)
		)

		if (matchedCondition) {
			const widget = {
				...item,
				options: { ...item.options, ...matchedCondition },
			}

			const text = matchedCondition?.text || valueCompare
			return { widget, text }
		}
	}

	return { widget: item, text: valueCompare }
}

export function matchCondition(condition: Condition, valueCompare: any) {
	const type = isNaN(valueCompare)
		? typeof valueCompare
		: typeof parseInt(valueCompare)

	if (type !== 'string' && type !== 'number') return false
	const { operator, value } = condition

	if (type === 'string') {
		return matchString(valueCompare, value, operator)
	} else {
		const left = parseInt(valueCompare)
		const right = !isNaN(value) ? parseInt(value) : value
		return matchNumber(left, right, operator)
	}
}

function matchString(left: string, right: string, operator: string) {
	switch (operator) {
		case 'eq':
			return left === right
		case 'neq':
			return left !== right
		case 'contains':
			return left.includes(right)
		case 'starts_with':
			return left.startsWith(right)
		case 'ends_with':
			return left.endsWith(right)
		default:
			return false
	}
}

function matchNumber(left: number, right: number, operator: string) {
	switch (operator) {
		case 'eq':
			return left === right
		case 'neq':
			return left !== right
		case 'gt':
			return left > right
		case 'gte':
			return left >= right
		case 'lt':
			return left < right
		case 'lte':
			return left <= right
		default:
			return false
	}
}
