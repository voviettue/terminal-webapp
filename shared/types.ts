export interface Display {
	value: any
	options: Record<string, any>
}

export interface TableHeader {
	value: string
	text?: string
	display?: string
	displayOptions?: Record<string, any>
}
