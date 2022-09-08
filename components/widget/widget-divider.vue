<template>
	<div
		:class="[
			'relative',
			'flex',
			'py-5',
			'items-center',
			orientationRow ? 'flex-row' : 'flex-col',
			!orientationRow ? `h-[${height}px]` : '',
		]"
		:style="styles"
	>
		<div
			v-if="capPosition === 'right' || capPosition === 'bottom'"
			:class="`flex-grow ${
				orientationRow ? 'border-t' : 'border-l'
			}  border-[${color}] border-${strokeStyle || 'solid'}`"
		></div>
		<span v-if="content" class="flex-shrink mx-4 text-gray-400">
			{{ content || '' }}
		</span>
		<div
			v-if="capPosition === 'left' || capPosition === 'top'"
			:class="`flex-grow
            ${orientationRow ? 'border-t' : 'border-l'}
			 border-[${color}] border-${strokeStyle || 'solid'}
             `"
		></div>
	</div>
</template>

<script setup lang="ts">
import { DividerWidget } from '~~/shared/types'

interface Props {
	widget: DividerWidget
}

const props: any = defineProps<Props>()
const { cap, orientation, color, strokeStyle, capPosition, height } = props
	.widget?.options as DividerWidget

const content = cap || ''
const orientationRow = orientation === 'horizontal'
// let position =
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
</script>
