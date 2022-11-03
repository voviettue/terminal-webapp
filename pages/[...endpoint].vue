<template>
	<PageWrapper v-if="page" :page="page">
		<RenderPage :page="page" :params="params" />
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

const page = ref(null)
const endpoint = route.params?.endpoint
const params = ref({})

onBeforeMount(() => {
	page.value = detectPage()

	if (!page.value) {
		throwError({ statusCode: 404, statusMessage: `Page not found` })
	}
})

function detectPage() {
	// find page with correct endpoint
	let page = pages.value.find((e) => {
		return endpoint.join('/') === e.endpoint.replace(/^\//, '')
	})
	if (page) return page

	// find page with endpoint has params
	page = pages.value.find((e) => {
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

	return page
}

watch(page, () => {
	useHead({
		title: page.value?.title,
	})
})
</script>
