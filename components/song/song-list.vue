<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard>
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
			>
				<template #item-actions="{ item }">
					<NuxtLink
						:to="`/${collection}/${item.id}`"
						class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
					>
						View
					</NuxtLink>
				</template>
			</CollectionTable>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const collection = 'songs'
const headers = [
	{ value: 'song_id', text: 'Song Number' },
	{ value: 'song_name', text: 'Song Name' },
	{ value: 'release_date', text: 'Release Date' },
	{ value: 'ipi', text: 'IPI' },
	{ value: 'isni', text: 'ISNI' },
	{ value: 'ipn', text: 'IPN' },
	{ value: 'actions', text: 'aaas' },
]
const fields = ['id', ...headers.map((e) => e.value)]
</script>
