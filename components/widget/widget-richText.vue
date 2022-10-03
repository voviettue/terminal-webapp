<!-- eslint-disable vue/no-v-html -->
<template>
	<p :style="styles" v-html="content"></p>
</template>

<script setup lang="ts">
import { RichTextWidget } from '~~/shared/types'

interface Props {
	widget: RichTextWidget
}

const props: any = defineProps<Props>()
const { getStyles } = useUtils()

const styles = getStyles(props.widget.options)
const { result: content } = useBindData(
	props.widget?.content,
	props.widget?.context
)
</script>
