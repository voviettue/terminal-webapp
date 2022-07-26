<template>
	<TwCard title="Reversions">
		<CollectionTable
			:collection="collection"
			:headers="dealReversionsHeaders"
			:fields="dealReversionsFields"
			:filter="dealReversionsFilter"
		/>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const collection = 'reversion_dates_deals'
const dealReversionsHeaders = [
	{
		value: 'reversion_dates_id.reversion_date',
		text: 'Reversion Date',
		display: 'date',
	},
]
const dealReversionsFields = [...dealReversionsHeaders.map((e) => e.value)]
const dealReversionsFilter = { deals_id: { id: { _eq: props.id } } }
</script>
