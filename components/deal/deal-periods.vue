<template>
	<TwCard title="Period Deals">
		<CollectionTable
			:collection="collection"
			:headers="dealPeriodsHeader"
			:fields="dealPeriodsFields"
			:filter="dealPeriodsFilter"
		>
			<template #item-period_type="{ item }">
				{{
					dealPeriodTypeChoices?.find(
						(l) => upperCase(l.value) === upperCase(item.period_type)
					)?.text || '—'
				}}
			</template>
			<template #item-period_status="{ item }">
				{{
					dealPeriodStatusChoices?.find(
						(l) => upperCase(l.value) === upperCase(item.period_status)
					)?.text || '—'
				}}
			</template>
		</CollectionTable>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const { upperCase } = useLodash()
const directus = useDirectus()

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

const periodsFields: any = await directus.fields.readMany(collection)
const dealPeriodTypeChoices = periodsFields.find(
	(field) => field.field === 'period_type'
)?.meta?.options?.choices
const dealPeriodStatusChoices = periodsFields.find(
	(field) => field.field === 'period_status'
)?.meta?.options?.choices
</script>
