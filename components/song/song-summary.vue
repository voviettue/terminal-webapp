<template>
	<TwCard title="Song summary">
		<CollectionTable
			:collection="collection"
			:headers="headers"
			:fields="fields"
			:filter="filter"
			:limit="5"
		>
			<template #item-share_controlled="{ value }">
				<span class="uppercase">{{ value }}</span>
			</template>

			<template #[dealsSlot]="{ item }">
				{{
					(item.related_deals ?? [])
						.map((e) => e?.deals_id?.deal_name)
						.join(', ')
				}}
			</template>
		</CollectionTable>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const collection = 'song_summary'
const headers = [
	{ value: 'song_name.song_name', text: 'Song Name' },
	{
		value: 'writer.contact_name',
		text: 'Writer',
	},
	{
		value: 'contribution',
		text: 'Contribution',
		display: 'percent',
	},
	{
		value: 'share_controlled',
		text: 'Share Controlled',
	},
	{
		value: 'related_deals.deals_id.deal_name',
		text: 'Deals',
	},
]
const fields = ['id', ...headers.map((e) => e.value)]
const filter = {
	related_song: { id: { _eq: props.id } },
}
const dealsSlot = 'item-related_deals.deals_id.deal_name'
</script>
