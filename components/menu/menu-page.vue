<template>
	<NuxtLink
		:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm  ${
			route.path.startsWith(endpoint) ? 'active' : ''
		}`"
		:to="endpoint"
	>
		{{ menu.label }}
	</NuxtLink>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MenuPage } from '~/shared/types'

interface Props {
	menu: MenuPage
}

const props = defineProps<Props>()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)
const route = useRoute()

const page = pages.value.find(
	(e) => e.id.toString() === props.menu.page?.toString()
)

if (!page) navigateTo('/404')

const endpoint = page.endpoint.startsWith('/')
	? page.endpoint
	: `/${page.endpoint}`
</script>

<style scoped>
.active {
	@apply font-medium border-indigo-500;
}
</style>
