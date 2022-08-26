<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<p :style="styles" v-html="content"></p>
	</div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { RichTextWidget } from '~~/shared/types'

interface Props {
	widget: RichTextWidget
}

const props: any = defineProps<Props>()
const { fontFamily } = props.widget as any
const styles = getStyles()
const { escape } = useLodash()
const content = escape(props.widget?.content)

// functions
function getStyles() {
	const styles = {
		'font-family': fontFamily,
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
