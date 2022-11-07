export interface Widget {
	id: number
	key: string
	name: string
	width: string
	widget: string
	html_class: string
	options: Record<string, any>
	parent: number
	page?: number
	context?: Record<string, any>
}

export interface TextWidget extends Widget {
	text?: string
	textSize?: string
	textColor?: string
	textAlign?: Array<'left' | 'right' | 'center' | 'justify'>
	textStyle?: Array<'bold' | 'italic' | 'underline'>
	fontFamily?: string
	background?: string
	border?: string
	condition?: Record<string, any>[]
}

export interface KeyValueWidget extends Widget {
	data?: any
	background?: string
	style?: string
	rows?: number | string
	lineBetweenRows?: boolean
	textAlignLeft?: Array<'left' | 'right' | 'center' | 'justify'>
	textAlignRight?: Array<'left' | 'right' | 'center' | 'justify'>
	textStyleLeft?: Array<'bold' | 'italic' | 'underline'>
	textStyleRifht?: Array<'bold' | 'italic' | 'underline'>
	textColorLeft?: string
	textColorRight?: string
	keys?: Record<string, any>
}

export interface RichTextWidget extends Widget {
	content?: string
	fontFamily?: string
}

export interface ImageWidget extends Widget {
	type?: 'url' | 'file'
	url?: string
	file?: string
	defaultImage?: string
	objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
	ratioWidth?: number
	ratioHeight?: number
	borderRadius?: string
	zoom?: number
	shadow?: string
}

export interface ContainerWidget extends Widget {
	gap?: string
	background?: string
	borderRadius?: string
	shadow?: boolean
	widgets?: Widget[]
}

export interface IframeWidget extends Widget {
	url: string
}

export interface DividerWidget extends Widget {
	orientation?: string
	strokeStyle?: string
	color?: string
	cap?: string
	capPosition?: string
	height?: string
	lineHeight?: string
	lineWidth?: string
}

export interface ListWidget extends ContainerWidget {
	data?: any
	itemBackground?: string
	itemSpacing?: string
}

export interface LinkWidget extends TextWidget {
	url: string
	tooltip?: string
	newTab?: boolean
}

export interface ButtonWidget extends Widget {
	label?: string
	buttonSize?: string
	leftIcon?: string
	rightIcon?: string
	disabled: boolean
	buttonVariant?: string
	borderRadius?: number
	shadow?: string
	position: string
	outline?: boolean
	onClick?: string
	buttonType?: string
	tooltip?: string
}
export interface IconButtonWidget extends Partial<ButtonWidget> {
	icon: string
}

export interface CalendarWidget extends Widget {
	visible?: boolean
	data: Record<string, any>
	defaultDate?: Date
	defaultView?: string
	displayTemplate?: string
	firstDay?: number
	startDate?: Date
	endDate?: Date
	borderRadius?: string
	shadow?: string
}
export interface InputWidget extends Widget {
	defaultValue?: string | number
	required?: boolean
	placeholder?: string
	disabled?: boolean
	label: string
	labelPosition?: string
	labelColor?: string
	labelSize?: string
	labelFontFamily?: string
	labelWidth?: number
	onChange?: string
	borderRadius?: number
	shadow?: string
	hideLabel?: boolean
	readonly?: boolean
	prefix?: string
	suffix?: string
	helpText?: string
	labelFontStyle?: string[]
	validations?: Record<string, any>[]
	prefixIcon?: string
	suffixIcon?: string
	autofocus?: boolean
	tooltip?: string
	alignment?: string
}

export interface TextInputWidget extends InputWidget {
	minLength?: number
	maxLength?: number
	trim?: boolean
	masked?: boolean
	regex?: string
	errorMessage?: string
	reset?: boolean
}

export interface NumberInputWidget extends InputWidget {
	masked?: boolean
	regex?: string
	errorMessage?: string
	reset?: boolean
	decimalPlaces?: number
	showThousandsSeparator?: boolean
	stepInterval?: number
}

export interface SelectWidget extends InputWidget {
	allowOther?: boolean
	allowSearching?: boolean
	choices: Record<string, string | number>[]
	alignment?: string
	allowNone?: boolean
	icon?: string
}

export interface TextareaInput extends InputWidget {
	showWorkLimit?: boolean
	trim?: boolean
}

export interface TagsWidget extends Widget {
	delimiter?: string
	allowWrap?: boolean
}

export interface TabItem {
	key: string
	label: string
	hidden: boolean
	icon?: string
	widgets?: number[]
}

export interface TabsWidget extends Widget {
	tabs: TabItem[]
	tabDefault: string
	border?: string
	borderRadius?: string
	onTabSelected: string
}

export interface DatetimeInputWidget extends InputWidget {
	minLength?: number
	rightIcon?: string
	errorMessage?: string
	alignment?: string
	autoFocus?: boolean
	reset?: boolean
	tooltip?: string
	minDate?: string
	maxDate?: string
	timePrecision?: string
}

export interface MenuButtonWidget extends Widget {
	label?: string
	buttonSize?: string
	leftIcon?: string
	rightIcon?: string
	disabled: boolean
	buttonVariant?: string
	borderRadius?: number
	shadow?: string
	position: string
	outline?: boolean
	buttonType?: string
	tooltip?: string
	menuItems?: any
}
