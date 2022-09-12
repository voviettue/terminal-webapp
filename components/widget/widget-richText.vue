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
const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const styles = getStyles(props.widget.options)
const content = renderTemplate(props.widget?.content, pageStore.context) ?? null
</script>
