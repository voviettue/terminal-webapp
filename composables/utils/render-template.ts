export default function renderTemplate(template: string, context: any): string {
	const regex = /({{[$.\w\s]+}})/g
	const matches = [...template.matchAll(regex)]
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
		result = template.replace(block, replacement)
	})

	return result
}
