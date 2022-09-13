export default function renderTemplate(template: string, context: any): string {
	const regex = /({{.*?}})/g
	const matches = typeof template === 'string' ? [...template.matchAll(regex)] : []
	let result = template

	matches.forEach((match) => {
		const block = match[0]
		const statement = 'return ' + block.replace('{{', '').replace('}}', '')
		const { $query, $item } = context
		// eslint-disable-next-line no-new-func
		const fn = new Function('$item', '$query', statement)

		const value = fn($item, $query) ?? block
		const replacement =
			typeof value === 'string' ? value : JSON.stringify(value)
		result = result.replace(block, replacement)
	})

	return result
}
