<template>
	<TwCard title="Documents">
		<CollectionTable
			:collection="collection"
			:headers="dealDocumentsHeader"
			:fields="dealDocumentsField"
			:filter="dealDocumentsFilter"
		>
			<template #[fileSlot]="{ item }">
				<NuxtLink
					v-if="item?.directus_files_id?.id"
					:to="`${getFile(item?.directus_files_id?.id)}`"
					class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
					no-prefetch
					target="_blank"
				>
					{{ item?.directus_files_id?.filename_download }}
				</NuxtLink>
				<template v-else>—</template>
			</template>
		</CollectionTable>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const { getFile } = useUtils()
const collection = 'deals_directus_files'
const dealDocumentsHeader = [
	{ value: 'directus_files_id.title', text: 'Name' },
	{ value: 'directus_files_id.description', text: 'Description' },
	{
		value: 'directus_files_id.modified_on',
		text: 'Last Updated',
		display: 'date',
	},
	{ value: 'directus_files_id.file', text: 'File' },
]

const dealDocumentsField = [
	...dealDocumentsHeader.map((e) => e.value),
	'directus_files_id.id',
	'directus_files_id.filename_download',
]
const dealDocumentsFilter = { deals_id: { id: { _eq: props.id } } }
const fileSlot = 'item-directus_files_id.file'
</script>
