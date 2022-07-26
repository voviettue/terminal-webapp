<template>
	<TwCard title="Contacts">
		<CollectionTable
			:collection="collection"
			:headers="dealContactsHeaders"
			:fields="dealContactsFields"
			:filter="dealContactsFilter"
		>
			<template #[roleSlot]="{ item }">
				{{ item.contacts_id?.roles?.join(', ') }}
			</template>
		</CollectionTable>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const collection = 'deals_contacts'
const dealContactsHeaders = [
	{ value: 'contacts_id.contact_name', text: 'Name' },
	{ value: 'contacts_id.roles', text: 'Role' },
	{ value: 'contacts_id.phone_number', text: 'Phone' },
	{ value: 'contacts_id.email', text: 'Email' },
]
const dealContactsFields = [...dealContactsHeaders.map((e) => e.value)]
const dealContactsFilter = { deals_id: { id: { _eq: props.id } } }
const roleSlot = 'item-contacts_id.roles'
</script>
