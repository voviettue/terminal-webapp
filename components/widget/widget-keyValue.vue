<template>
	<div :style="styles" :class="widget.style || 'bottom-line'">
		<template v-for="(item, key, index) in widget.keys">
			<div
				v-if="
					(!widget?.rows || (index || 0) < widget.rows) &&
					get(data, item.key) &&
					!item?.hidden
				"
				:key="index"
				class="key-value-grid"
			>
				<div :style="getStylesBy('Left', item)">
					<span>{{ item.label || '—' }}</span>
				</div>
				<div :style="getStylesBy('Right', item)">
					<template v-if="item?.display">
						<RenderDisplay
							:name="item.display"
							:value="get(data, item.key)"
							:options="item?.displayOptions"
							:context="{ $item: get(data, item.key) }"
						></RenderDisplay>
					</template>
					<template v-else>
						{{ startCase(upperFirst(get(data, item.key))) || '—' }}
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import upperFirst from 'lodash/upperFirst'
import startCase from 'lodash/startCase'
import get from 'lodash/get'
import mergeWith from 'lodash/mergeWith'
import cloneDeep from 'lodash/cloneDeep'
import isNull from 'lodash/isNull'
import { KeyValueWidget } from '~/shared/types'

interface Props {
	widget: KeyValueWidget
}

const props: any = defineProps<Props>()

const { getStyles, parseJson } = useUtils()

const styles = getStyles(props.widget.options)
const cssBinding: Record<string, any> = ref({})

const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)
const data = computed(() => {
	return parseJson(rawData.value, [])
})

function getStylesBy(position: string, optionsStyle: Record<string, any>) {
	const styles = {}
	const widgetOptions = cloneDeep(props.widget.options)
	const options = mergeWith({}, widgetOptions, optionsStyle, (o: any, s: any) =>
		isNull(s) ? o : s
	)

	Object.keys(options).forEach((k) => {
		if (k.includes(position)) {
			const key = k.replace(position, '')
			styles[key] = options[k]
		}
	})

	return getStyles(styles) || null
}

onMounted(() => {
	cssBinding.value.borderStyle = props.widget.borderType || 'solid'
	cssBinding.value.background = props.widget?.options?.background || '#fafafa'
})
</script>

<style scoped lang="scss">
.bottom-line > div {
	padding: 0.875rem 0;
	border-bottom: 1px #d1d5db v-bind('cssBinding.borderStyle');
}
.connected-line {
	.key-value-grid {
		position: relative;
		> div {
			&:first-child {
				display: flex;
				align-items: center;
			}
		}
	}
	span {
		padding: 0 0.25rem;
		background-color: v-bind('cssBinding.background');
	}
	> div {
		margin: 0.875rem 0;
		&::before {
			content: '';
			position: absolute;
			bottom: 0.25rem;
			width: 100%;
			z-index: 1;
			border-bottom: 1px #d1d5db v-bind('cssBinding.borderStyle');
		}
		> div {
			z-index: 2;
		}
	}
}
.covered-border {
	border: 1px #d1d5db v-bind('cssBinding.borderStyle');
	border-bottom: 0;
	> div {
		padding: 0.875rem;
		border-bottom: 1px #d1d5db v-bind('cssBinding.borderStyle');
	}
}
.key-value-grid {
	display: flex;
	align-items: center;
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
