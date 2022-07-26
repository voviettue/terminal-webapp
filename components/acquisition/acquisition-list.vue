<template>
	<div class="bg-white shadow overflow-hidden sm:rounded">
		<div class="p-4 sm:px-6 lg:px-8">
			<CollectionTable
				:collection="collection"
				:headers="listHeader"
				:fields="fields"
				:row-click="(item) => navigateTo(`/acquisitions/${item.id}`)"
			>
				<template #item-hipgnosis_fund="{ item }">
					{{
						list['hipgnosis']?.find((s) => s.value === item.hipgnosis_fund)
							?.text || '—'
					}}
				</template>
				<template #item-catalog_status="{ item }">
					{{
						list['status']?.find((s) => s.value === item.catalog_status)
							?.text || '—'
					}}
				</template>
			</CollectionTable>
		</div>
	</div>
</template>
<!-- eslint-disable camelcase -->
<script setup>
import { listHeader } from './constants'
const directus = useDirectus()
const collection = ref('catalog')
const fields = [...listHeader.map((item) => item.value), 'id']
const list = reactive({})
async function getFields() {
	const catalogFields = await directus
		.items('directus_fields')
		.readOne('catalog')
	list.status = catalogFields.find(
		(item) => item.field === 'catalog_status'
	)?.meta?.options?.choices
	list.hipgnosis = catalogFields.find(
		(item) => item.field === 'hipgnosis_fund'
	)?.meta?.options?.choices
}
onMounted(() => {
	getFields()
})
</script>
