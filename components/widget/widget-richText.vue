<!-- eslint-disable vue/no-v-html -->
<template>
	<p :style="styles" v-html="widget?.content"></p>
</template>

<script setup lang="ts">
import { RichTextWidget } from '~~/shared/types'

interface Props {
	widget: RichTextWidget
}

const props: any = defineProps<Props>()
const { getStyles } = useUtils()

const styles = getStyles(props.widget.options)
</script>
