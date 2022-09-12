<template>
	<p :style="styles">{{ text }}</p>
</template>

<script setup lang="ts">
import { TextWidget } from '~~/shared/types'

interface Props {
	widget: TextWidget
}

const props: any = defineProps<Props>()
const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const styles = getStyles(props.widget.options)

const text = renderTemplate(props.widget?.text, {
	...pageStore.context,
	...props.widget?.context,
})
</script>
