<template>
	<div :style="styles" :class="props.widget.style || 'bottom-line'">
		<template v-for="(value, key, index) in data">
			<div
				v-if="!widget?.rows || (index || 0) < widget.rows"
				:key="index"
				:class="`sm:grid sm:grid-cols-2`"
			>
				<div :style="leftStyle">
					<span>{{ key }}</span>
				</div>
				<div :style="rightStyle">
					<span>{{ value }}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { KeyValueWidget } from '~/shared/types'

interface Props {
	widget: KeyValueWidget
}

const props: any = defineProps<Props>()

const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const styles = getStyles(props.widget.options)
const leftStyle = getStylesBy('Left')
const rightStyle = getStylesBy('Right')

let data = null
try {
	data =
		JSON.parse(
			renderTemplate(props.widget?.data, {
				...pageStore.context,
				...props.widget?.context,
			})
		) ?? []
} catch {}

function getStylesBy(position: string) {
	const styles = {}
	const options = props.widget.options

	Object.keys(options).forEach((k) => {
		if (k.includes(position)) {
			const key = k.replace(position, '')
			styles[key] = options[k]
		}
	})

	return getStyles(styles)
}
</script>

<style scoped>
.bottom-line > div {
	padding: 0.875rem 0;
	border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
}
.connected-line > div {
	margin: 0.875rem 0;
	border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
	height: 1rem;
}
.connected-line span {
	padding: 0 0.25rem;
	background-color: #fafafa;
}
.covered-border {
	border: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
	border-bottom: 0;
}
.covered-border > div {
	display: flex;
	padding: 0.875rem;
	border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
}
.covered-border > div > div:first-child {
	flex: 1;
}
.covered-border > div > div:last-child {
	flex: 2;
}
</style>
