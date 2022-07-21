<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard>
			<CollectionTable
				collection="deals"
				:headers="headers"
				:fields="[...headers.map((e) => e.value), 'id']"
			/>
		</TwCard>
	</div>
</template>

<script setup>
const headers = [
	{ value: 'deal_id', text: 'Deal ID' },
	{ value: 'type', text: 'Type' },
	{ value: 'deal_name', text: 'Deal Name' },
	{ value: 'territory', text: 'Territory' },
	{ value: 'agreement_status', text: 'Agreement Status' },
	{ value: 'agreement_start_date', text: 'Start Date' },
	{ value: 'agreement_end_date', text: 'End Date' },
	{ value: 'actions', text: 'Action' },
]
</script>
