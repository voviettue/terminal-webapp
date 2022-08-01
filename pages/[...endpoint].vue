<template>
	<div>
		<h1>Page {{ endpoint }} in comming</h1>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

definePageMeta({
	title: '...',
	middleware: ['auth'],
})

const route = useRoute()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

const pageInfo = ref(null)
const endpoint = route.params?.endpoint[0]

onBeforeMount(() => {
	pageInfo.value = pages.value.find((e) => e.endpoint === `/${endpoint}`)
})

watch(pageInfo, () => {
	useHead({
		title: pageInfo.value.title,
	})
})
</script>
