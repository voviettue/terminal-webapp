<template>
	<iframe :src="url" width="100%" frameborder="0" :style="styles"></iframe>
</template>

<script setup lang="ts">
import { IframeWidget } from '~~/shared/types'
interface Props {
	widget: IframeWidget
}

const props: any = defineProps<Props>()
const { getStyles } = useUtils()

const { result: url } = useBindData(props.widget?.url, props.widget?.context)
const defaultStyles = { 'aspect-ratio': '16/9' }
let styles = getStyles(props.widget.options)
styles = { ...defaultStyles, ...styles }
</script>
