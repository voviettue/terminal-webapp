import { CSSProperties } from 'vue'

export default function getStyles(options: Record<string, any>): CSSProperties {
	if (!options || Object.keys(options).length === 0) return null

	const {
		textSize,
		textColor,
		textAlign,
		textStyle,
		background,
		fontFamily,
		border,
		borderColor,
		zoom,
		ratioWidth,
		ratioHeight,
		objectFit,
		borderRadius,
		textTransform,
		borderWidth,
		height,
		width,
		maxWidth,
	} = options
	const styles = {
		'font-size': textSize,
		'line-height': textSize ? 1.25 : null,
		color: textColor,
		'text-align': textAlign,
		background,
		'font-weight': textStyle?.includes('bold') ? 'bold' : null,
		'font-style': textStyle?.includes('italic') ? 'italic' : null,
		'text-decoration': textStyle?.includes('underline') ? 'underline' : null,
		'font-family': fontFamily,
		border:
			border || (borderWidth && borderColor)
				? `${borderWidth ?? '1px'} solid ${border ?? borderColor}`
				: null,
		'aspect-ratio':
			ratioWidth && ratioHeight ? `${ratioWidth}/${ratioHeight}` : null,
		'object-fit': objectFit ?? null,
		transform: zoom ? `scale(${zoom})` : null,
		'border-radius': borderRadius ?? null,
		'text-transform': textTransform ?? null,
		width: width ?? null,
		'max-width': maxWidth ?? null,
		height,
	}

	Object.keys(styles).forEach((k) => {
		if (
			styles[k] === null ||
			styles[k] === undefined ||
			String(styles[k]).trim() === ''
		) {
			delete styles[k]
		}
	})
	return styles as CSSProperties
}
