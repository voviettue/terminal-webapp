<template>
	<p :style="styles">{{ widget.text }}</p>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { TextWidget } from '~~/shared/types'

interface Props {
	widget: TextWidget
}

const props: any = defineProps<Props>()
const {
	textSize,
	textColor,
	textAlign,
	background,
	textStyle,
	fontFamily,
	border,
} = props.widget as any
const styles = getStyles()

// functions
function getStyles() {
	const styles = {
		'font-size': textSize,
		'line-height': 1.25,
		color: textColor,
		'text-align': textAlign,
		background,
		'font-weight': textStyle?.includes('bold') ? 'bold' : null,
		'font-style': textStyle?.includes('italic') ? 'italic' : null,
		'text-decoration': textStyle?.includes('underline') ? 'underline' : null,
		'font-family': fontFamily,
		border: border ? `1px solid ${border}` : null,
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
</script>
