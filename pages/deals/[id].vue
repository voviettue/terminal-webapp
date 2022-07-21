<template>
	<div class="space-y-8">
		<h1
			class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
		>
			{{ dealItem.deal_name }}
		</h1>
		<div class="grid grid-cols-2 gap-6 mb-8">
			<div>
				<TwCard title="Deal Information" class="mb-6">
					<TwList :headers="detailDealHeader" :item="dealItem" />
				</TwCard>
				<TwCard title="Catalog" class="mb-6">
					<TwList :headers="dealCatalogHeader" :item="dealCatalogItem" />
				</TwCard>
				<TwCard v-if="dealItem.notes" class="mb-6">
					<span v-html="dealItem.notes" />
				</TwCard>
				<TwCard title="Agreement Party" class="mb-6">
					<TwList
						:headers="[
							...dealAgreementPartyHeader,
							...dealAgreementPartyLawyerHeader,
						]"
						:item="{
							...dealAgreementPartyItem,
							...dealAgreementPartyLawyerItem,
						}"
					/>
				</TwCard>
				<TwCard title="Songs" class="mb-6">
					<TwList :headers="dealSongsHeader" :item="dealItem" />
				</TwCard>
				<!-- <TwCard title="Publishing" class="mb-6">
				</TwCard>
				<TwCard title="Documents" class="mb-6">
				</TwCard> -->
			</div>
			<div>
				<TwCard title="Deals Connected" class="mb-6">
					<TwTable
						:headers="connectedDealsHeader"
						:items="connectedDealsItem"
						hide-header
					>
						<template #item-action="{ item }">
							<NuxtLink
								:to="`/deals/${item.id}`"
								class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								View
							</NuxtLink>
						</template>
					</TwTable>
				</TwCard>
				<TwCard title="Royalty Rates" class="mb-6">
					<TwList
						:headers="dealRoyaltyRatesHeader"
						:item="dealRoyaltyRatesItem"
					>
						<template #item-royalty_notes>
							<span v-html="dealRoyaltyRatesItem.royalty_notes ?? 'N/A'" />
						</template>
					</TwList>
				</TwCard>
				<TwCard title="Royalty Account Information" class="mb-6">
					<TwList
						:headers="dealRoyaltyAccountInformationHeader"
						:item="dealItem"
					/>
				</TwCard>
				<TwCard title="Sync" class="mb-6">
					<!-- <TwList :headers="dealSynchHeader" :item="dealItem" /> -->
				</TwCard>
				<TwCard title="Notifications" class="mb-6">
					<TwList :headers="dealNotificationsHeader" :item="dealItem" />
				</TwCard>
				<TwCard title="Agreement Dates" class="mb-6">
					<TwList :headers="dealAgreementDatesHeader" :item="dealItem" />
				</TwCard>
				<TwCard title="Reversions" class="mb-6">
					<TwTable
						:headers="dealReversionDatesHeader"
						:items="dealReversionDatesItem"
					/>
				</TwCard>
				<TwCard v-if="dealContactsItem.length" title="Contacts" class="mb-6">
					<TwTable :headers="dealContactsHeader" :items="dealContactsItem" />
				</TwCard>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	title: 'Deal Detail',
	middleware: ['auth'],
})
const directus = useDirectus()
const route = useRoute()
const id = route.params.id

const detailDealHeader = [
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'deal_name', text: 'Deal Name' },
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'type', text: 'Deal Type' },
	{ value: 'sub_type', text: 'Sub-deal Type' },
	{ value: 'number_of_song_schedules', text: 'Number of Song Schedules' },
]

const connectedDealsHeader = [
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'deal_name', text: 'Deal Name' },
	{ value: 'action', text: 'Deal Name' },
]

const dealCatalogHeader = [
	{ value: 'catalog_id', text: 'Catalog Number' },
	{ value: 'catalog_name', text: 'Catalog Name' },
	{ value: 'agreement_status', text: 'Agreement Status' },
]

const dealAgreementPartyHeader = [
	{ value: 'entity_id', text: 'Agreement Party ID' },
	{ value: 'entity_name', text: 'Agreement Party Name' },
	{ value: 'address', text: 'Agreement Party Address' },
	{ value: 'entity_id', text: 'Agreement Party ID' },
]
const dealAgreementPartyLawyerHeader = [
	{ value: 'contact_name', text: 'Agreement Party Lawyer' },
	{ value: 'email', text: 'Agreement Party Email' },
	{ value: 'phone_number', text: 'Agreement Party Cell' },
	{ value: 'ipi', text: 'Agreement Party IPI' },
]

const dealSongsHeader = [
	{ value: 'number_of_songs', text: 'Number of Songs' },
	{
		value: 'no_shared_songs',
		text: 'Number of shared songs with acquisitions',
	},
]

const dealRoyaltyRatesHeader = [
	{ value: 'synch_royalty_rate', text: 'Synch Royalty Rate' },
	{ value: 'procured_synch_royalty_rate', text: 'Procured Synch Royalty Rate' },
	{ value: 'perf_royalty_rate', text: 'Perf Royalty Rate' },
	{ value: 'mech_royalty_rate', text: 'Mech Royalty Rate' },
	{ value: 'other_royalty_rate', text: 'Other Royalty Rate' },
	{ value: 'royalty_notes', text: 'Royalty Rate Notes' },
]

const dealRoyaltyAccountInformationHeader = [
	{ value: 'account_number', text: 'Publishing Account Number' },
	{ value: '', text: 'Publishing Account Reference' },
	{ value: 'lod', text: 'LOD' },
	{ value: 'royalty_contact', text: 'Royalty Contact' },
]

const dealNotificationsHeader = [
	{ value: 'option_letter_due', text: 'Option Letter Due' },
	{ value: 'option_letter_sent', text: 'Option Letter Sent' },
	{ value: 'termination_letter_due', text: 'Termination Letter Due' },
	{ value: 'termination_letter_sent', text: 'Termination Letter Sent' },
]

const dealAgreementDatesHeader = [
	{ value: 'agreement_signature_date', text: 'Agreement Signature Date' },
	{ value: 'agreement_start_date', text: 'Agreement Start Date' },
	{ value: 'agreement_end_date', text: 'Agreement End Date' },
]

const dealContactsHeader = [
	{ value: 'contact_name', text: 'Name' },
	{ value: 'roles', text: 'Role' },
	{ value: 'phone_number', text: 'Phone' },
	{ value: 'email', text: 'Email' },
]

const dealReversionDatesHeader = [
	{ value: 'reversion_date', text: 'Reversion Date' },
]

const deals = directus.items('deals')
const dealItem = await deals.readOne(id, {
	fields: [
		...detailDealHeader.map((header) => header.value),
		'connected_deals.related_deals_id.id',
		...connectedDealsHeader.map(
			(header) => 'connected_deals.related_deals_id.' + header.value
		),
		...dealCatalogHeader.map((header) => 'catalog.' + header.value),
		'agreement_status',
		'agreement_start_date',
		'agreement_end_date',
		'notes',
		...dealAgreementPartyHeader.map(
			(header) => 'agreement_party.' + header.value
		),
		...dealAgreementPartyLawyerHeader.map(
			(header) => 'agreement_party_lawyer.' + header.value
		),
		...dealSongsHeader.map((header) => header.value),
		...dealRoyaltyRatesHeader.map((header) => header.value),
		...dealNotificationsHeader.map((header) => header.value),
		...dealAgreementDatesHeader.map((header) => header.value),
		...dealContactsHeader.map(
			(header) => 'contacts.contacts_id.' + header.value
		),
		'reversion_dates.reversion_dates_id.reversion_date',
	],
})
const connectedDealsItem = dealItem.connected_deals.map(
	(deal) => deal.related_deals_id
)
const dealCatalogItem = dealItem.catalog
dealCatalogItem.agreement_status = dealItem.agreement_status
const dealAgreementPartyItem = dealItem.agreement_party
const dealAgreementPartyLawyerItem = dealItem.agreement_party_lawyer
const dealContactsItem = dealItem.contacts
	.map((contact) => contact.contacts_id)
	.filter(Boolean)
const dealRoyaltyRatesItem = {
	synch_royalty_rate: parseFloat(dealItem.synch_royalty_rate) * 100,
	procured_synch_royalty_rate: parseFloat(dealItem.synch_royalty_rate) * 100,
	perf_royalty_rate: parseFloat(dealItem.synch_royalty_rate) * 100,
	mech_royalty_rate: parseFloat(dealItem.synch_royalty_rate) * 100,
	other_royalty_rate: parseFloat(dealItem.synch_royalty_rate) * 100,
	royalty_notes: dealItem.royalty_notes,
}
const dealReversionDatesItem = dealItem.reversion_dates.map(
	(reversionDate) => reversionDate.reversion_dates_id
)
</script>
