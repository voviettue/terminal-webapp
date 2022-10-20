<template>
	<div :style="styles">
		<template v-for="(item, key, index) in widget.keys">
			<div
				v-if="
					(!widget?.rows || (index || 0) < widget.rows) &&
					get(data, item.key) &&
					!item?.hidden
				"
				:key="index"
				class="key-value-grid"
				:class="getWidgetStyle(item)"
			>
				<div :style="getKeyStyle(item)">
					<span>{{ item.label || '—' }}</span>
				</div>
				<div :style="getValueStyle(item)">
					<template v-if="item?.display">
						<RenderDisplay
							:name="item.display"
							:value="get(data, item.key)"
							:options="item?.displayOptions"
							:context="{ $item: data, $value: get(data, item.key) }"
						></RenderDisplay>
					</template>
					<template v-else>
						<span>
							{{ startCase(upperFirst(get(data, item.key))) || '—' }}
						</span>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import upperFirst from 'lodash/upperFirst'
import startCase from 'lodash/startCase'
import mergeWith from 'lodash/mergeWith'
import cloneDeep from 'lodash/cloneDeep'
import isNull from 'lodash/isNull'
import { get } from '~/utils/get-with-arrays'
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

function getWidgetStyle(conditionOptions) {
	return conditionOptions?.style || props.widget.options?.style || 'bottom-line'
}

function getKeyStyle(conditionOptions) {
	const styles = getStylesBy('Left', conditionOptions)
	const justifyContent = styles?.['text-align'] || null

	return { ...styles, justifyContent }
}

function getValueStyle(conditionOptions) {
	const styles = getStylesBy('Right', conditionOptions)
	const justifyContent =
		conditionOptions?.displayOptions?.textAlign ||
		styles?.['text-align'] ||
		null

	return { ...styles, justifyContent }
}

function getStylesBy(position: string, optionsStyle: Record<string, any>) {
	const styles = {}
	const widgetOptions = cloneDeep(props.widget.options)
	const options = mergeWith(
		{},
		widgetOptions,
		optionsStyle,
		optionsStyle?.displayOptions,
		(o: any, s: any) => (isNull(s) ? o : s)
	)

	Object.keys(options).forEach((k) => {
		if (k.includes(position)) {
			const key = k.replace(position, '')
			styles[key] = options[k]
		}
	})

	return getStyles(styles)
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
	&.key-value-grid {
		> div {
			display: flex;
			align-items: center;
		}
	}
	span,
	p {
		padding: 0 0.25rem;
		background-color: v-bind('cssBinding.background');
		z-index: 2;
	}
	> div {
		margin: 0.875rem 0;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			bottom: 0.25rem;
			width: 100%;
			z-index: 1;
			border-bottom: 1px #d1d5db v-bind('cssBinding.borderStyle');
		}
	}
}
.covered-border {
	border: 1px #d1d5db v-bind('cssBinding.borderStyle');
	margin-top: -1px;
	> div {
		padding: 0.875rem;
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
