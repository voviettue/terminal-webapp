<template>
	<TwCard title="Contacts" class="mb-5">
		<TwTable :headers="contactHeader" :items="contacts" :row-click="() => {}" />
	</TwCard>
</template>
<script setup lang="ts">
import { contactHeader } from './constants'
const props = defineProps<{ data: Record<string, any> }>()
const directus = useDirectus()
const contacts = ref([])
async function getContacts(data) {
	if (!data?.contacts?.length) return []
	const apiContacts = await directus.items('contacts').readMany(data.contacts, {
		fields: [
			'contact_name',
			'id',
			'contact_id',
			'phone_number',
			'roles',
			'email',
		],
	})
	contacts.value = apiContacts.data.map((item: Record<string, any>) => {
		return {
			...item,
			contact_role: item.roles.join(' & '),
		}
	})
}
onMounted(() => {
	getContacts(props.data)
})
</script>
