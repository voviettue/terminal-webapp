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

export interface Page {
	endpoint: string
	hidden: boolean
	id: number
	name: string
	title: string
}

interface MenuItemShape {
	endpoint: string
	hidden: boolean
	id: number
	name: string
	title: string
}

interface MenuItemOptionsPage {
	page: string
}

interface MenuItemOptionsLink {
	url: string
}

export interface MenuItemPage extends MenuItemShape {
	options: MenuItemOptionsPage
}

export interface MenuItemLink extends MenuItemShape {
	options: MenuItemOptionsLink
}

export type Menus = (MenuItemPage | MenuItemLink)[]

export type Settings = {
	project_name: string
	project_logo: string
	project_background: string
	menus: Menus
}
