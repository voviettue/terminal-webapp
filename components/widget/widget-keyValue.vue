<template>
	<div :style="styles" :class="props.widget.style || 'bottom-line'">
		<template v-for="(value, key, index) in data">
			<div
				v-if="
					(!widget?.rows || (index || 0) < widget.rows) &&
					keyTransformation(key)
				"
				:key="index"
				class="key-value-grid"
			>
				<div :style="leftStyle">
					<span>{{ keyTransformation(key) || '—' }}</span>
				</div>
				<div :style="rightStyle">
					<span>{{ startCase(upperFirst(value)) || '—' }}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import upperFirst from 'lodash/upperFirst'
import startCase from 'lodash/startCase'
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

function keyTransformation(key) {
	return props.widget?.keyTransformation?.find((e: any) => e.key === key)?.value
}

let data = null
try {
	data =
		JSON.parse(
			await renderTemplate(props.widget?.data, {
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
.connected-line {
	position: relative;
}
.connected-line > div {
	margin: 0.875rem 0;
}
.connected-line > div::before {
	content: '';
	position: absolute;
	width: 100%;
	height: 1rem;
	z-index: 1;
	border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
}
.connected-line > div > div {
	z-index: 2;
}
.connected-line span {
	padding: 0 0.25rem;
	background-color: #ffffff;
}
.covered-border {
	border: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
	border-bottom: 0;
}
.covered-border > div {
	padding: 0.875rem;
	border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
}
.key-value-grid {
	display: flex;
}
.key-value-grid > div:first-child {
	flex: 1;
}
.key-value-grid > div:last-child {
	flex: 2;
}
</style>
