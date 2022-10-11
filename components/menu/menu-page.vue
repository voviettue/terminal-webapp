<template>
	<NuxtLink
		:class="{ menu: true, active, sub: nested, 'space-x-2': true }"
		:to="endpoint"
	>
		<TwIcon
			v-if="menu.icon"
			:name="menu.icon"
			class="icon shrink-0 text-xl"
		></TwIcon>
		<span class="label">{{ menu.label }}</span>
		<span class="tooltip">
			{{ menu.label }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MenuPage } from '~/shared/types'

interface Props {
	menu: MenuPage
	nested: boolean
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
