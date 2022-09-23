import isEmpty from 'lodash/isEmpty'

export default function renderTemplate(template: string, context: any): string {
	const regexFunction = /(\(\s?{{(?:{.*}|[^{])*}}\s?\))/g
	const matchesFunction =
		typeof template === 'string' ? [...template.matchAll(regexFunction)] : []

	const regex = /({{(?:{.*}|[^{])*}})/g
	const matches =
		typeof template === 'string' ? [...template.matchAll(regex)] : []

	let result = template

	matches.forEach((match) => {
		const block = match[0]
		let statement = 'return ' + block.replace(/^{{|}}$/g, '')

		if (!isEmpty([...statement.matchAll(regex)])) {
			statement = renderTemplate(statement, context)
		}

		const { $query, $item } = context
		try {
			// eslint-disable-next-line no-new-func
			const fn = new Function('$item', '$query', statement)
			const value = fn($item, $query) ?? block

			const replacement =
				typeof value === 'string' && isEmpty(matchesFunction)
					? value
					: JSON.stringify(value)
			result = result.replace(block, replacement)
		} catch (err) {
			// do nothing
		}
	})

	return result
}
