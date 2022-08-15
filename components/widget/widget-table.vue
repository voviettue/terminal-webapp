<template>
	<TwTable :headers="columns" :items="data"></TwTable>
</template>

<script setup lang="ts">
import { TableHeader } from '~~/shared/types'

interface Props {
	widget: any
}
const props = defineProps<Props>()
const data = props.widget.data ?? []
const columns = props.widget.columns ?? ([] as TableHeader[])
</script>
