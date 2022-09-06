export interface Query {
	id: number
	key: string
	name: string | null
	options: any
	output: string | null
	refresh_on_load: boolean
	timeout: number
	query: 'items' | 'api' | 'json'
}
