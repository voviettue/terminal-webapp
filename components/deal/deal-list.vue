<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard>
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
				:row-click="(item) => navigateTo(`/${collection}/${item.id}`)"
			>
				<template #item-type="{ item }">{{ upperCase(item?.type) }}</template>
			</CollectionTable>
		</TwCard>
	</div>
</template>

<script setup>
const { upperCase } = useLodash()

const collection = 'deals'
const headers = [
	{ value: 'deal_id', text: 'Deal ID' },
	{ value: 'type', text: 'Type' },
	{ value: 'deal_name', text: 'Deal Name' },
	{ value: 'territory.territory', text: 'Territory' },
	{ value: 'agreement_status', text: 'Agreement Status' },
	{ value: 'agreement_start_date', text: 'Start Date', display: 'date' },
	{ value: 'agreement_end_date', text: 'End Date', display: 'date' },
]
const fields = [...headers.map((e) => e.value), 'id', 'territory.territory']
</script>
