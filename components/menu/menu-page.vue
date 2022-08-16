<template>
	<NuxtLink
		:class="`p-4 py-2 border-transparent border-l-4 flex items-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 hover:sm:bg-inherit sm:border-l-0 sm:p-0 ${
			active ? 'active' : ''
		}`"
		:to="endpoint"
	>
		<TwIcon
			v-if="menu.icon"
			:name="menu.icon"
			class="text-green text-xl mr-2"
		></TwIcon>
		<span>{{ menu.label }}</span>
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

const endpoint = computed(() => {
	const page = pages.value.find(
		(page) => page.id.toString() === props.menu.page.toString()
	)
	if (!page) return '/homepage'

	return page.endpoint.startsWith('/') ? page.endpoint : `/${page.endpoint}`
})
const active = computed(() => route.path.startsWith(endpoint.value))
</script>

<style scoped>
.active {
	@apply bg-indigo-50 border-indigo-500 font-medium sm:border-b-2 sm:border-l-0 sm:bg-inherit;
}
</style>
