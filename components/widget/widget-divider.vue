<template>
	<div
		:class="['relative', 'flex', 'py-5', 'items-center']"
		:style="styleDivider"
	>
		<div
			v-if="!capPosition || ['right', 'bottom', 'center'].includes(capPosition)"
			class="flex-grow"
			:style="getStylesBorder()"
		></div>
		<span v-if="content" class="flex-shrink mx-4 text-gray-400">
			{{ content || '' }}
		</span>
		<div
			v-if="!capPosition || ['left', 'top', 'center'].includes(capPosition)"
			class="flex-grow"
			:style="getStylesBorder()"
		></div>
	</div>
</template>

<script setup lang="ts">
import { DividerWidget } from '~~/shared/types'

interface Props {
	widget: DividerWidget
}

const props: any = defineProps<Props>()
const {
	cap,
	orientation,
	color,
	strokeStyle,
	capPosition,
	lineHeight,
	lineWidth,
} = props.widget?.options as DividerWidget

const content = cap || ''
const orientationRow = orientation === 'horizontal'
// let position =
const { getStyles } = useUtils()
const getStylesDivider = () => {
	const styles = getStyles(props.widget.options)
	const line = orientationRow
		? { width: `${lineWidth}px` }
		: { height: `${lineWidth}px` }
	const direction = { 'flex-direction': orientationRow ? 'row' : 'column' }
	return { ...styles, ...line, ...direction }
}
const styleDivider = getStylesDivider()
const getStylesBorder = () => {
	return orientationRow
		? {
				'border-top': `${lineHeight || 1}px ${color} ${strokeStyle || 'solid'}`,
		  }
		: {
				'border-left': `${lineHeight || 1}px ${color} ${
					strokeStyle || 'solid'
				}`,
		  }
}
</script>
