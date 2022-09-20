import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'

export function applyConditions(item: Record<string, any>, valueCompare: any) {
	if (item?.options && Array.isArray(item?.condition)) {
		const matchingCondition = matchedConditions(item?.condition, valueCompare)
		if (!isEmpty(matchingCondition)) {
			const widget = {
				...item,
				options: merge({}, item.options || {}, matchingCondition[0]),
			}

			const text = matchingCondition[0]?.text || valueCompare
			return { widget, text }
		}

		return { widget: item, text: valueCompare }
	} else {
		return { widget: item, text: valueCompare }
	}
}

function matchedConditions(
	conditions: Record<string, any>[],
	valueCompare: any
) {
	const type = typeof valueCompare

	if (type !== 'string' && type !== 'number') {
		return false
	}

	return (conditions || []).filter(({ operator, value }) => {
		return type === 'string'
			? matchString(valueCompare, value, operator)
			: matchNumber(valueCompare, value, operator)
	})
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
	}
}
