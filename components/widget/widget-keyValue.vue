<template>
	<div :style="styles" :class="widget.style || 'bottom-line'">
		<template v-for="(item, key, index) in widget.keyTransformation">
			<div
				v-if="
					(!widget?.rows || (index || 0) < widget.rows) && get(data, item.key)
				"
				:key="index"
				class="key-value-grid"
			>
				<div :style="leftStyle">
					<span>{{ item.value || '—' }}</span>
				</div>
				<div :style="rightStyle">
					<span>{{ startCase(upperFirst(get(data, item.key))) || '—' }}</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import upperFirst from 'lodash/upperFirst'
import startCase from 'lodash/startCase'
import get from 'lodash/get'
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

<style scoped lang="scss">
.bottom-line > div {
	padding: 0.875rem 0;
	border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
}
.connected-line {
	position: relative;
	span {
		padding: 0 0.25rem;
		background-color: #ffffff;
	}
	> div {
		margin: 0.875rem 0;
		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 1rem;
			z-index: 1;
			border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
		}
		> div {
			z-index: 2;
		}
	}
}
.covered-border {
	border: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
	border-bottom: 0;
	> div {
		padding: 0.875rem;
		border-bottom: 1px #d1d5db v-bind('props.widget.borderType || "solid"');
	}
}
.key-value-grid {
	display: flex;
	> div {
		&:first-child {
			flex: 1;
		}
		&:last-child {
			flex: 2;
		}
	}
}
</style>
