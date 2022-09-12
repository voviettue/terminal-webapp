export default function renderTemplate(template: string, context: any): string {
	const regex = /({{[$.\w\s]+}})/g
	const matches = [...template.matchAll(regex)]
	let result = template

	matches.forEach((match) => {
		const block = match[0]
		const statement = 'return ' + block.replace('{{', '').replace('}}', '')

		const { $query } = context
		// eslint-disable-next-line no-new-func
		const fn = new Function('$query', statement)

		const value = fn($query) ?? block
		const replacement =
			typeof value === 'string' ? value : JSON.stringify(value)
		result = template.replace(block, replacement)
	})

	return result
}
