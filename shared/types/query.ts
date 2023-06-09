export interface Query {
	id: number
	key: string
	name: string | null
	options: any
	output: object | string | null
	refresh_on_load: boolean
	timeout: number
	query: 'items' | 'api' | 'json' | 'item' | 'js-object'
}

export interface JsonQuery extends Query {
	json?: string
}

export interface ItemsQuery extends Query {
	collection?: string
	fields?: string[]
	filter: any
}
