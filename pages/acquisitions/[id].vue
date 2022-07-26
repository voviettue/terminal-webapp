<template>
	<PageWrapper>
		<template #breadcrumb>ACQUISTION SUMMARY</template>
		<template #title>{{ data.catalog_name }}</template>
		<div class="grid grid-cols-5 gap-6 mb-8 font-sans">
			<div class="col-span-3">
				<TwCard title="Deal Description" class="mb-6">
					<p class="text-sm">
						{{ data.catalog_headline }}
					</p>
				</TwCard>
				<div class="grid grid-cols-2 gap-6 mb-6">
					<TwMedia icon="thermometer">
						<template #description>
							<p>Catalogue Status</p>
							<p class="font-bold">
								{{
									list['catalog_status']?.find(
										(l) => l.value === data.catalog_status
									)?.text || '—'
								}}
							</p>
						</template>
					</TwMedia>
					<TwMedia icon="birthday">
						<template #description>
							<p>Birthday</p>
							<p class="font-bold"></p>
						</template>
					</TwMedia>
				</div>
				<TwCard title="Additional comments" class="mb-6">
					<div v-if="data.notes" v-html="data.notes"></div>
				</TwCard>
				<TwCard title="Deals within acquisition" class="mb-6">
					<TwTable :headers="dealHeader" :items="deals">
						<template #item-actions="{ item }">
							<NuxtLink
								:to="`/deals/${item.id}`"
								class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
							>
								View
							</NuxtLink>
						</template>
					</TwTable>
				</TwCard>
				<TwCard title="Contacts" class="mb-6">
					<TwTable :headers="contactHeader" :items="contacts" />
				</TwCard>
				<TwCard title="Document" class="mb-6">
					<TwTable :headers="docHeader" :items="docs" />
				</TwCard>
			</div>
			<div class="col-span-2">
				<TwCard title="Deal information" class="mb-6">
					<TwList :headers="dealInfoHeader" :item="dealInfo">
						<template #item-hipgnosis_fund>
							{{
								list['hipgnosis_fund']?.find(
									(l) => l.value === data.hipgnosis_fund
								)?.text || '—'
							}}
						</template>
						<template #item-hipgnosis_entity>
							{{
								list['hipgnosis_entity']?.find(
									(l) => l.value === data.hipgnosis_entity
								)?.text || '—'
							}}
						</template>
					</TwList>
				</TwCard>
				<TwCard title="Royalty Rates" class="mb-6">
					<TwList :headers="rateHeader" :item="rates"></TwList>
				</TwCard>
				<TwCard title="Waiter" class="mb-6">Waiting confirm</TwCard>
				<TwCard title="Connected Acquisitions" class="mb-6">
					<div
						v-for="(item, index) in connects"
						:key="`connects_${index}`"
						class="w-full grid grid-cols-3 gap-2 mb-4"
					>
						<div class="text-left text-sm">{{ item.catalog_id }}</div>
						<div class="text-center text-sm">{{ item.catalog_name }}</div>
						<NuxtLink
							:to="`/acquisitions/${item.id}`"
							target="_blank"
							class="text-sm text-right font-medium text-indigo-600 hover:text-indigo-500"
						>
							Deal Summary
						</NuxtLink>
					</div>
				</TwCard>
				<TwCard title="Exclusions" class="mb-6">
					<div v-if="data.exclusions" v-html="data.exclusions"></div>
				</TwCard>
				<TwCard title="Links" class="mb-6">
					<div class="w-full">
						<a
							v-for="(item, index) in links"
							:key="`links_${index}`"
							:href="convertUrl(item.url)"
							target="_blank"
							class="text-sm font-medium text-indigo-600 hover:text-indigo-500 inline-block mr-1"
						>
							{{ item.text }},
						</a>
					</div>
				</TwCard>
			</div>
		</div>
	</PageWrapper>
</template>
<!-- eslint-disable camelcase -->
<script setup>
import {
	contactHeader,
	dealHeader,
	docHeader,
	dealInfoHeader,
	rateHeader,
} from '~/components/acquisition/constants'

definePageMeta({
	middleware: ['auth'],
	title: 'Acquisitions',
})

// const $filter = useFilters()
const directus = useDirectus()
const route = useRoute()
const { id } = route.params
const data = ref({})
const rates = ref([])
const deals = ref([])
const contacts = ref([])
const docs = ref([])
const dealInfo = ref([])
const links = ref([])
const connects = ref([])
const list = ref({})

// Deals
async function getDeals(data) {
	if (!data.deals?.length) return []
	const apiDeals = await directus.items('deals').readMany(data.deals)
	deals.value = apiDeals.data
}
// Contacts
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
	contacts.value = apiContacts.data.map((item) => {
		return {
			...item,
			contact_role: item.roles.join(' & '),
		}
	})
}
// Docs
async function getDocs(data) {
	if (!data.docs?.length) return []
	const apiDocs = await directus.items('catalog_files').readMany([data.docs])
	const arrDocs = apiDocs.data.map((item) => {
		return {
			id: item.id,
			file_id: item.directus_files_id,
		}
	})
	const apiFiles = await directus.files.readMany(
		arrDocs.map((doc) => doc.file_id)
	)
	docs.value = apiFiles.data.map((item) => {
		const { title, description, filename_disk, modified_on } = item
		return {
			title,
			description,
			updateAt: modified_on,
			attact: `File.${filename_disk.split('.')[1]}`,
		}
	})
}
// Deal Infor
async function getDealInfo(data) {
	let entity = ''
	if (data.vendor_entities?.length) {
		const vendor = await directus
			.items('entities')
			.readOne(data.vendor_entities[0])
		entity = vendor.entity_name
	}
	dealInfo.value = {
		...data,
		vendor_entities: entity,
	}
}
// rates
function getRates(data) {
	const {
		pub_share,
		writer_share,
		n_rights_share,
		master_rights_share,
		producer_rights_share,
		net_publisher_share,
		movie_producer_rights_share,
		number_of_songs,
		number_of_shared_songs,
	} = data
	rates.value = {
		publishing: pub_share,
		writer: writer_share,
		neigbouring: n_rights_share,
		master: master_rights_share,
		producer: producer_rights_share,
		net: net_publisher_share,
		movie: movie_producer_rights_share,
		song: number_of_songs,
		share: number_of_shared_songs,
	}
}
// links
async function getLinks(data) {
	if (!data.important_links?.length) return []
	const apiLinks = await directus.items('links').readMany(data.important_links)
	links.value = apiLinks.data.map((item) => {
		return {
			text: item.display_text,
			url: item.url,
		}
	})
}
// conected

async function getConnected(data) {
	if (!data.connected_acquisitions?.length) return []
	const apiConnect = await directus
		.items('catalog')
		.readMany(data.connected_acquisitions, {
			fields: ['catalog_name', 'catalog_id', 'id'],
		})
	connects.value = apiConnect.data
}

function convertUrl(url) {
	if (/^http?(s):/g.test(url)) return url
	return `http://${url}`
}

async function getFields() {
	const catalogFields = await directus
		.items('directus_fields')
		.readOne('catalog')
	list.value = catalogFields.reduce((pre, current) => {
		if (current.meta?.options?.choices)
			pre[current.field] = current.meta?.options?.choices
		return pre
	}, {})
}

onMounted(async () => {
	const res = await directus.items('catalog').readOne(id)
	data.value = res
	directus.items('directus_fields').readOne('catalog')
	getDeals(data.value)

	getContacts(data.value)

	getDocs(data.value)

	getDealInfo(data.value)

	getRates(data.value)

	getLinks(data.value)

	getConnected(data.value)

	getFields()
})

watch(data, () => {
	useHead({
		title: `Acquisitions ${data.value.catalog_name}`,
	})
})
</script>
