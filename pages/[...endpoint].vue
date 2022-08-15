<template>
	<PageWrapper>
		<RenderPage :page="pageInfo" :params="params" />
	</PageWrapper>
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
const endpoint = route.params?.endpoint
const params = ref({})

onBeforeMount(() => {
	detectPage()
})

function detectPage() {
	pageInfo.value = pages.value.find((e) => {
		const clearEndpoint = e.endpoint.replace(/^\//, '')
		const paths = clearEndpoint.split('/')

		const result =
			paths.length === endpoint.length &&
			endpoint.every((item, index) => {
				if (paths[index].startsWith(':')) {
					params.value[paths[index].substring(1)] = endpoint[index]
				}

				return paths[index].startsWith(':') || paths[index] === item
			})

		if (!result) {
			params.value = {}
		}

		return result
	})

	if (!pageInfo.value) {
		throwError({ statusCode: 404, statusMessage: `Page not found` })
	}
}

watch(pageInfo, () => {
	useHead({
		title: pageInfo.value?.title,
	})
})
</script>
