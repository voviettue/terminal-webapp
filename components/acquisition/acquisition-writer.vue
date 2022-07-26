<template>
	<TwCard title="Writers" class="mb-5">
		<div
			v-for="(item, index) in writers"
			:key="`connects_${index}`"
			class="w-full flex justify-between gap-6 mb-4"
		>
			<div class="text-left text-sm">{{ item.contact_name }}</div>
			<div class="text-center text-sm">
				<RenderDisplay
					name="date"
					:value="item.birthday"
					:options="{ format: 'PPP' }"
				></RenderDisplay>
			</div>
		</div>
	</TwCard>
</template>
<script setup lang="ts">
const directus = useDirectus()
const writers = ref([])
const props = defineProps<{ id: string }>()
async function getWriters() {
	const res = await directus.items('contacts').readByQuery({
		filter: {
			_and: [
				{ _and: [{ catalog: { catalog_id: { _eq: props.id } } }] },
				{ status: { _neq: 'archived' } },
			],
		},
		fields: ['birthday', 'contact_name'],
	})
	writers.value = res.data
}
onMounted(() => {
	getWriters()
})
</script>
