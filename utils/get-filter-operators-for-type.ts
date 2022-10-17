import { ClientFilterOperator, Type } from '@directus/shared/types'

type GetFilterOperationsForTypeOptions = {
	includeValidation?: boolean
}

export default function getFilterOperatorsForType(
	type: Type,
	opts?: GetFilterOperationsForTypeOptions
): ClientFilterOperator[] {
	const validationOnlyStringFilterOperators: ClientFilterOperator[] =
		opts?.includeValidation ? ['regex'] : []

	switch (type) {
		// Text
		case 'binary':
		case 'string':
		case 'text':
		case 'csv':
			return [
				'contains',
				'ncontains',
				// 'icontains',
				'starts_with',
				'nstarts_with',
				'ends_with',
				'nends_with',
				'eq',
				'neq',
				'empty',
				'nempty',
				'in',
				'nin',
				...validationOnlyStringFilterOperators,
			]
		// Hash
		case 'hash':
			return ['empty', 'nempty']
		// JSON
		// UUID
		case 'uuid':
			return ['eq', 'neq', 'empty', 'nempty', 'in', 'nin']
		case 'json':
			return ['empty', 'nempty']

		// Boolean
		case 'boolean':
			return ['eq', 'neq', 'empty', 'nempty']

		// Numbers
		case 'bigInteger':
		case 'integer':
		case 'decimal':
		case 'float':
			return [
				'eq',
				'neq',
				'lt',
				'lte',
				'gt',
				'gte',
				'between',
				'nbetween',
				'empty',
				'nempty',
				'in',
				'nin',
			]

		// Datetime
		case 'dateTime':
		case 'date':
		case 'time':
			return [
				'eq',
				'neq',
				'lt',
				'lte',
				'gt',
				'gte',
				'between',
				'nbetween',
				'empty',
				'nempty',
				'in',
				'nin',
			]

		case 'geometry':
			return [
				'empty',
				'nempty',
				'intersects',
				'nintersects',
				'intersects_bbox',
				'nintersects_bbox',
			]

		default:
			return [
				'contains',
				'ncontains',
				'eq',
				'neq',
				'lt',
				'lte',
				'gt',
				'gte',
				'between',
				'nbetween',
				'empty',
				'nempty',
				'in',
				'nin',
				...validationOnlyStringFilterOperators,
			]
	}
}
