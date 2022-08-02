<template>
	<NuxtLink
		:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm ${
			`/${endpoint}` === detailsPage?.endpoint
				? 'border-indigo-500 border-b-2 font-medium'
				: ''
		}`"
		:to="detailsPage?.endpoint"
	>
		{{ detailsPage?.name }}
	</NuxtLink>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

interface Props {
	label: string
	page: string | number
}

const props = defineProps<Props>()

const detailsPage = ref(null)
const endpoint = ref('')

const { usePageStore } = useStore()
const route = useRoute()
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

onBeforeMount(() => {
	detailsPage.value = getDetailsPage()
})

watch(
	route,
	() => {
		endpoint.value = (route.params.endpoint && route.params.endpoint[0]) || ''
	},
	{ immediate: true }
)

function getDetailsPage() {
	const result = pages.value?.find((e) => e.id.toString() === props.page)
	return result
}
</script>
