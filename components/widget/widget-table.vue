<template>
	<TwTable :headers="columns" :items="data" :style="styles"></TwTable>
</template>

<script setup lang="ts">
import { TableHeader } from '~~/shared/types'

interface Props {
	widget: any
}
const props = defineProps<Props>()
const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const columns = props.widget.columns ?? ([] as TableHeader[])

const styles = getStyles(props.widget.options)
const data =
	JSON.parse(renderTemplate(props.widget?.data, pageStore.context)) ?? []
</script>
