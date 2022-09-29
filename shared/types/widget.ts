export interface Widget {
	id: number
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
	keyTransformation?: Record<string, any>
}

export interface RichTextWidget extends Widget {
	content?: string
	fontFamily?: string
}

export interface ImageWidget extends Widget {
	url?: string
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
	disable: boolean
	buttonVariant?: string
	borderRadius?: number
	shadow?: string
	position: string
	outline?: boolean
	onClick?: string
}
export interface IconButtonWidget extends Widget {
	icon: string
	buttonSize?: string
	disable: boolean
	buttonVariant?: string
	borderRadius?: number
	shadow?: string
	position: string
	outline?: boolean
	onClick?: string
}
