export interface Menu {
	id: number
	name: string
	menu: string
	endpoint: string
	hidden: boolean
	label: string
	options: Record<string, any>
	icon?: string
}

export interface MenuPage extends Menu {
	page: string
}

export interface MenuLink extends Menu {
	url: string
}

export type MenuCategory = Menu
