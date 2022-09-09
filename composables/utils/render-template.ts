export default function renderTemplate(template: string, context: any): string {
	// const json = "{{ $query.songs }} \n dsadsad {{ $query.json_name.name }}dsadsadsa";

	const regex = /({{[$.\w\s]+}})/g
	const matches = [...template.matchAll(regex)]
	let result = template

	matches.forEach((match) => {
		const block = match[0]
		const statement = 'return ' + block.replace('{{', '').replace('}}', '')

		const { $query } = context
		// eslint-disable-next-line no-new-func
		const fn = new Function('$query', statement)

		const value = fn($query)
		const replacement =
			typeof value === 'string' ? value : JSON.stringify(value)
		result = template.replace(block, replacement)
		// console.log({ block, statement, value, replacement })
	})

	return result
}
