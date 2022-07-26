<template>
	<div class="bg-white shadow overflow-hidden sm:rounded">
		<TwCard title="Synch">
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
				:limit="10"
				:filter="filter"
			>
				<template #item-is_audio_purchased="{ value }">
					<span v-if="value === true">Yes</span>
					<span v-if="value === false">No</span>
					<span v-if="value === null">—</span>
				</template>
			</CollectionTable>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const collection = 'deals'
const headers = [
	{ value: 'catalogue.catalog_number', text: 'Catalogue Code' },
	{ value: 'writer.writer_code', text: 'Writer Code' },
	{ value: 'agreement_party.entity_name', text: 'Argreement Party Name' },
	{ value: 'synch_approvals', text: 'Synch Approval' },
	{ value: 'synch_approval_contact.contact_name', text: 'Synch Approval Name' },
	{ value: 'synch_approval_contact.email', text: 'Synch Approval Email' },
	{
		value: 'synch_approval_contact.contact_id',
		text: 'Synch Approval Contact No',
	},
	{ value: 'is_audio_purchased', text: 'Audio Purchase' },
]
const fields = ['id', ...headers.map((e) => e.value)]
const filter = {
	song_summary: { song_summary_id: { related_song: { _eq: props.id } } },
}
</script>
