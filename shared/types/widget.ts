export interface Widget {
	id: number
	name: string
	width: string
	widget: string
	htmlClass: string
	options: Record<string, any>
	parent: number
	page?: number
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
