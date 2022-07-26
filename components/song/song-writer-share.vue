<template>
	<div class="bg-white shadow overflow-hidden sm:rounded">
		<TwCard title="Writer Share - Tier 3">
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
				:row-click="(item) => navigateTo(`/songs/${item.id}`)"
				:filter="filter"
			>
				<template #item-share_controlled="{ value }">
					<span class="uppercase">{{ value }}</span>
				</template>

				<template #[agreementPartySlot]="{ item }">
					{{
						item?.related_deals
							? item?.related_deals
									.map((e) => e?.deals_id?.agreement_party?.entity_name)
									.join(', ')
									.toUpperCase()
							: '—'
					}}
				</template>

				<template #[terrytorySlot]="{ item }">
					{{
						item?.related_deals
							? item?.related_deals
									.map((e) => e?.deals_id?.territory?.territory)
									.join(', ')
									.toUpperCase()
							: '—'
					}}
				</template>

				<template #[typeSlot]="{ item }">
					{{
						item?.related_deals
							? item?.related_deals
									.map((e) => e?.deals_id?.type)
									.join(', ')
									.toUpperCase()
							: '—'
					}}
				</template>

				<template #[subTypeSlot]="{ item }">
					{{
						item?.related_deals
							? item?.related_deals
									.map((e) => e?.deals_id?.sub_type)
									.join(', ')
									.toUpperCase()
							: '—'
					}}
				</template>
			</CollectionTable>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const collection = 'song_summary'
const headers = [
	{ value: 'song_name.song_name', text: 'Song Name' },
	{ value: 'writer.contact_name', text: 'Writer' },
	{
		value: 'related_deals.deals_id.agreement_party.entity_name',
		text: 'Agreement Party',
	},
	{ value: 'related_deals.deals_id.territory.territory', text: 'Territory' },
	{ value: 'share_controlled', text: 'Is Shared' },
	{ value: 'contribution', text: 'Contribution', display: 'percent' },
	{ value: 'related_deals.deals_id.type', text: 'Deal type' },
	{ value: 'related_deals.deals_id.sub_type', text: 'Sub type' },
]
const fields = ['id', ...headers.map((e) => e.value)]
const filter = {
	_and: [
		{ related_deals: { deals_id: { type: { _eq: 'pro' } } } },
		{ related_song: props.id },
	],
}
const agreementPartySlot =
	'item-related_deals.deals_id.agreement_party.entity_name'
const terrytorySlot = 'item-related_deals.deals_id.territory.territory'
const typeSlot = 'item-related_deals.deals_id.type'
const subTypeSlot = 'item-related_deals.deals_id.sub_type'
</script>
