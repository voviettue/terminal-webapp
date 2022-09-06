import { Menu } from './menu'

export * from './menu'
export * from './widget'
export * from './query'

export interface Display {
	value: any
	options: Record<string, any>
}

export interface TableHeader {
	key: string
	label?: string
	display?: string
	displayOptions?: Record<string, any>
}

export interface Page {
	endpoint: string
	hidden: boolean
	id: string | number
	name: string
	title: string
}

export type Settings = {
	project_name: string
	project_logo: string
	project_background: string
	homepage: number
	menus: Menu[]
}
