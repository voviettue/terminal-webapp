<template>
	<PageWrapper>
		<template #breadcrumb>DEAL SUMMARY</template>
		<template #title>{{ dealItem.deal_name }}</template>

		<div class="grid grid-cols-2 gap-6 mb-8">
			<div class="space-y-6">
				<TwCard title="Deal Information">
					<TwList :headers="dealInformationHeaders" :item="dealItem">
						<template #item-type>{{ upperCase(dealItem.type) }}</template>
						<template #item-sub_type>
							{{ upperCase(dealItem.sub_type) }}
						</template>
					</TwList>
				</TwCard>
				<TwCard title="Catalog">
					<TwList :headers="dealCatalogHeaders" :item="dealItem" />
				</TwCard>
				<TwCard
					v-if="dealItem.notes"
					:body-padding="false"
					class="p-4 sm:px-6 lg:px-8 text-center"
				>
					<span v-html="dealItem.notes" />
				</TwCard>
				<TwCard title="Agreement Party">
					<TwList :headers="dealAgreementPartyHeaders" :item="dealItem" />
				</TwCard>
				<TwCard title="Songs">
					<TwList :headers="dealSongHeaders" :item="dealItem" />
				</TwCard>
				<DealPeriods :id="id" />
				<DealDocuments :id="id" />
			</div>
			<div class="space-y-6">
				<TwCard title="Deals Connected">
					<TwTable
						:headers="connectedDealsHeader"
						:items="connectedDealsItem"
						hide-header
					>
						<template #item-actions="{ item }">
							<NuxtLink
								:to="`/${collection}/${item?.id}`"
								class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								VIEW
							</NuxtLink>
						</template>
					</TwTable>
				</TwCard>
				<TwCard title="Royalty Rates">
					<TwList :headers="dealRoyaltyRatesHeader" :item="dealItem">
						<template #item-royalty_notes>
							<span v-html="dealItem.royalty_notes ?? '—'" />
						</template>
					</TwList>
				</TwCard>
				<TwCard title="Account Information">
					<TwList :headers="dealAccountInformationHeader" :item="dealItem">
						<template #item-account_number>
							{{
								dealItem?.account_number
									? [
											...dealItem?.account_number?.map(
												(el) => el.account_number
											),
									  ].join(', ')
									: '—'
							}}
						</template>
						<template #item-royalty_contact>
							{{ dealItem?.royalty_contact?.contact_name ?? '—' }}
						</template>
						<template #item-lod>
							<NuxtLink
								v-if="dealItem?.lod?.id"
								:to="`${getFile(dealItem?.lod?.id)}`"
								class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
								no-prefetch
								target="_blank"
							>
								{{ dealItem?.lod?.filename_download }}
							</NuxtLink>
							<template v-else>—</template>
						</template>
					</TwList>
				</TwCard>
				<TwCard title="Notifications">
					<TwList :headers="dealNotificationsHeader" :item="dealItem" />
				</TwCard>
				<TwCard title="Agreement Dates">
					<TwList :headers="dealAgreementDatesHeader" :item="dealItem" />
				</TwCard>
				<DealReversions :id="id" />
				<DealContacts :id="id" />
			</div>
		</div>
	</PageWrapper>
</template>

<script setup>
const { getFile } = useUtils()
const { upperCase } = useLodash()

definePageMeta({
	title: 'Deal Detail',
	middleware: ['auth'],
})
const directus = useDirectus()
const route = useRoute()
const id = route.params.id
const collection = 'deals'

const dealInformationHeaders = [
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'deal_name', text: 'Deal Name' },
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'type', text: 'Deal Type' },
	{ value: 'sub_type', text: 'Sub-deal Type' },
	{ value: 'number_of_song_schedules', text: 'Number of Song Schedules' },
]

const dealCatalogHeaders = [
	{ value: 'catalog.catalog_id', text: 'Catalog Number' },
	{ value: 'catalog.catalog_name', text: 'Catalog Name' },
	{ value: 'agreement_status', text: 'Agreement Status' },
]

const dealAgreementPartyHeaders = [
	{ value: 'agreement_party.entity_id', text: 'Agreement Party ID' },
	{ value: 'agreement_party.entity_name', text: 'Agreement Party Name' },
	{ value: 'agreement_party.address', text: 'Agreement Party Address' },
	{
		value: 'agreement_party_lawyer.contact_name',
		text: 'Agreement Party Lawyer',
	},
	{ value: 'agreement_party_lawyer.email', text: 'Agreement Party Email' },
	{
		value: 'agreement_party_lawyer.phone_number',
		text: 'Agreement Party Cell',
	},
	{ value: 'agreement_party_lawyer.ipi', text: 'Agreement Party IPI' },
]

const dealSongHeaders = [
	{ value: 'number_of_songs', text: 'Number of Songs' },
	{
		value: 'no_shared_songs',
		text: 'Number of shared songs with acquisitions',
	},
]

const connectedDealsHeader = [
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'deal_name', text: 'Deal Name' },
	{ value: 'actions', text: 'Actions' },
]

const dealRoyaltyRatesHeader = [
	{
		value: 'synch_royalty_rate',
		text: 'Synch Royalty Rate',
		display: 'percent',
	},
	{
		value: 'procured_synch_royalty_rate',
		text: 'Procured Synch Royalty Rate',
		display: 'percent',
	},
	{ value: 'perf_royalty_rate', text: 'Perf Royalty Rate', display: 'percent' },
	{ value: 'mech_royalty_rate', text: 'Mech Royalty Rate', display: 'percent' },
	{
		value: 'other_royalty_rate',
		text: 'Other Royalty Rate',
		display: 'percent',
	},
	{ value: 'royalty_notes', text: 'Royalty Rate Notes' },
]

const dealAccountInformationHeader = [
	{ value: 'account_number', text: 'Account Number' },
	{ value: 'portal_access', text: 'Portal Access' },
	{ value: 'daca_account', text: 'Daca Account' },
	{ value: 'royalty_contact', text: 'Royalty Contact' },
	{ value: 'lod', text: 'LOD' },
]

const dealNotificationsHeader = [
	{ value: 'option_letter_due', text: 'Option Letter Due' },
	{ value: 'option_letter_sent', text: 'Option Letter Sent', display: 'date' },
	{
		value: 'termination_letter_due',
		text: 'Termination Letter Due',
		display: 'date',
	},
	{
		value: 'termination_letter_sent',
		text: 'Termination Letter Sent',
		display: 'date',
	},
]

const dealAgreementDatesHeader = [
	{
		value: 'agreement_signature_date',
		text: 'Agreement Signature Date',
		display: 'date',
	},
	{
		value: 'agreement_start_date',
		text: 'Agreement Start Date',
		display: 'date',
	},
	{ value: 'agreement_end_date', text: 'Agreement End Date', display: 'date' },
]

const deals = directus.items(collection)
const dealItem = await deals.readOne(id, {
	fields: [
		'deal_name',
		...dealInformationHeaders.map((header) => header.value),
		...dealCatalogHeaders.map((header) => header.value),
		'notes',
		...dealAgreementPartyHeaders.map((header) => header.value),
		...dealSongHeaders.map((header) => header.value),
		'connected_deals.related_deals_id.id',
		...connectedDealsHeader.map(
			(header) => 'connected_deals.related_deals_id.' + header.value
		),
		'royalty_contact.contact_name',
		...dealRoyaltyRatesHeader.map((header) => header.value),
		'lod.id',
		'lod.filename_download',
		...dealAccountInformationHeader.map((header) => header.value),
		...dealNotificationsHeader.map((header) => header.value),
		...dealAgreementDatesHeader.map((header) => header.value),
	],
})
const connectedDealsItem = dealItem.connected_deals.map(
	(deal) => deal.related_deals_id
)
</script>
