<template>
	<TwCard title="Connected Acquisitions" class="mb-5">
		<div
			v-for="(item, index) in connects"
			:key="`connects_${index}`"
			class="w-full grid grid-cols-3 gap-2 mb-4"
		>
			<div class="text-left text-sm">{{ item.catalog_id }}</div>
			<div class="text-center text-sm">{{ item.catalog_name }}</div>
			<NuxtLink
				:to="`/acquisitions/${item.id}`"
				target="_blank"
				class="text-sm text-right font-medium text-indigo-600 hover:text-indigo-500"
			>
				Deal Summary
			</NuxtLink>
		</div>
	</TwCard>
</template>
<script setup lang="ts">
const directus = useDirectus()
const connects = ref([])
const props = defineProps<{ data: Record<string, any> }>()

async function getConnected(data) {
	if (!data.connected_acquisitions?.length) return []
	const apiConnect = await directus
		.items('catalog')
		.readMany(data.connected_acquisitions, {
			fields: ['catalog_name', 'catalog_id', 'id'],
		})
	connects.value = apiConnect.data
}
onMounted(() => {
	getConnected(props.data)
})
</script>
