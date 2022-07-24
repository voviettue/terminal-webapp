<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard title="Share table">
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
				:row-click="(item) => navigateTo(`/songs/${item.id}`)"
				:filter="filter"
			/>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const collection = 'share_tables'
const headers = [
	{ value: 'catalogue.catalog_number', text: 'Cat No.' },
	{ value: 'writer_name.contact_name', text: 'Writer Name' },
	{ value: 'related_deal.agreement_party', text: 'Linked Publisher' },
	{ value: 'writer_name.ipi', text: 'Writer IPI ??' },
	{ value: 'pro1', text: 'Pro 1 ??' },
	{ value: 'pro2', text: 'Pro 2 ??' },
	{ value: 'pro3', text: 'Pro 3 ??' },
	{ value: 'controlled', text: 'Controlled' },
	{ value: 'acquisition_deal.writer_share', text: 'Writer Share (%)' },
	{ value: 'acquisition_deal.pub_share', text: 'Pub Share (%)' },
	{ value: 'acquisition_deal.synch_share', text: 'Synch Share (%) ??' },
	{ value: 'acquisition_deal.synch_share', text: 'Pub Share Owned ??' },
	{ value: 'acquisition_deal.synch_share', text: 'Writer Share Owned ??' },
	{ value: 'acquisition_deal.n_rights', text: 'N Right Owned' },
	{ value: 'acquisition_deal.master_rights', text: 'Master Owned' },
	{ value: 'acquisition_deal.producer_rights', text: 'Producer Rights Owned' },
	{
		value: 'acquisition_deal.net_publisher_share',
		text: 'Net Publisher Owned',
	},
	{
		value: 'acquisition_deal.movie_producer_rights',
		text: 'Movie Producer Rights',
	},
	{ value: 'multiple_publishers', text: 'Multiple Publishers' },
	{ value: 'multiple_publishers', text: 'Teritory ??' },
]
const fields = ['id', ...headers.map((e) => e.value)]
const filter = { songs_id: { _eq: route.params.id } }
</script>
