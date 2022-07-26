<template>
	<TwCard title="Period Deals">
		<CollectionTable
			:collection="collection"
			:headers="dealPeriodsHeader"
			:fields="dealPeriodsFields"
			:filter="dealPeriodsFilter"
		>
			<template #item-period_type="{ item }">
				{{ upperCase(item?.period_type) }}
			</template>
			<template #item-period_status="{ item }">
				{{ upperCase(item?.period_status) }}
			</template>
		</CollectionTable>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const { upperCase } = useLodash()
const collection = 'periods'
const dealPeriodsHeader = [
	{ value: 'period_type', text: 'Period Type' },
	{ value: 'start_date', text: 'Start Date', display: 'date' },
	{ value: 'end_date', text: 'End Date', display: 'date' },
	{ value: 'territory.territory', text: 'Territory' },
	{ value: 'period_status', text: 'Status' },
]

const dealPeriodsFields = ['id', ...dealPeriodsHeader.map((e) => e.value)]
const dealPeriodsFilter = { related_deal: { id: { _eq: props.id } } }
</script>
