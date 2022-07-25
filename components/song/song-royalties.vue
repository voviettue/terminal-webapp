<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard title="Royalties">
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
				:filter="filter"
				:limit="6"
			/>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const collection = 'royalties'
const headers = [
	{ value: 'related_deal.catalogue.catalog_number', text: 'Catalogue Code' },
	{
		value: 'related_deal.catalog.writer_share',
		text: 'Writer Share',
		display: 'percent',
	},
	{
		value: 'related_deal.catalog.pub_share',
		text: 'Pub Share',
		display: 'percent',
	},
	{
		value: 'related_deal.catalog.pub_share',
		text: 'Synch Share ??',
		display: 'percent',
	},
]
const fields = ['id', ...headers.map((e) => e.value)]
const filter = {
	related_deal: { related_song_list: { id: { _eq: props.id } } },
}
</script>
