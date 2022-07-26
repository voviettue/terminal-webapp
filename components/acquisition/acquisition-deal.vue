<template>
	<TwCard title="Deals within acquisition" class="mb-5">
		<TwTable :headers="dealHeader" :items="deals" :row-click="() => {}">
			<template #item-actions="{ item }">
				<NuxtLink
					:to="`/deals/${item.id}`"
					target="_blank"
					class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
				>
					View
				</NuxtLink>
			</template>
		</TwTable>
	</TwCard>
</template>
<script setup lang="ts">
import { dealHeader } from './constants'
const props = defineProps<{ id: string }>()
const directus = useDirectus()
const deals = ref([])
// Deals
async function getDeals(id) {
	const apiDeals = await directus.items('deals').readByQuery({
		filter: {
			_and: [
				{ _and: [{ catalog: { catalog_id: { _contains: id } } }] },
				{ status: { _neq: 'archived' } },
			],
		},
	})
	deals.value = apiDeals.data
}
onMounted(() => {
	getDeals(props.id)
})
</script>
