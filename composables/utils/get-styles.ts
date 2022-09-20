import { CSSProperties } from 'vue'

export default function getStyles(options: Record<string, any>): CSSProperties {
	const {
		textSize,
		textColor,
		textAlign,
		textStyle,
		background,
		fontFamily,
		border,
		zoom,
		ratioWidth,
		ratioHeight,
		objectFit,
		borderRadius,
		textTransform,
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
		border: border ? `1px solid ${border}` : null,
		'aspect-ratio':
			ratioWidth && ratioHeight ? `${ratioWidth}/${ratioHeight}` : null,
		'object-fit': objectFit ?? null,
		transform: zoom ? `scale(${zoom})` : null,
		'border-radius': borderRadius ?? null,
		'text-transform': textTransform ?? null,
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
