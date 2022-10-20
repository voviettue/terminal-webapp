// @TODO: write test case for this function
export default async function renderTemplate(template: any, context: any) {
	if (typeof template !== 'string') return template

	const regex = /({{.*?}})/g
	const matches =
		typeof template === 'string' ? [...template.matchAll(regex)] : []
	let result = template

	for (const match of matches) {
		const block = match[0]
		const statement = 'return ' + block.replace(/^{{|}}$/g, '')
		const { $query, $item, $value } = context
		try {
			// eslint-disable-next-line no-new-func
			const fn = new Function('$query', '$item', '$value', statement)
			const value = await fn($query, $item, $value)
			const replaceValue = !value
				? ''
				: typeof value === 'string'
				? value
				: JSON.stringify(value)
			result = result.replace(block, replaceValue)
		} catch (err) {
			result = result.replace(block, '')
		}
	}

	return result
}
