<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<div class="p-4 sm:px-6 lg:px-8">
			<TwTable :headers="headers" :items="items">
				<template #item-actions="{ item }">
					<NuxtLink
						:to="`/songs/${item.id}`"
						class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
					>
						View
					</NuxtLink>
				</template>
			</TwTable>
		</div>
	</div>
</template>

<script setup>
const directus = useDirectus()

const headers = [
	{ value: 'song_id', text: 'Song Number' },
	{ value: 'song_name', text: 'Song Name' },
	{ value: 'release_date', text: 'Release Date' },
	{ value: 'ipi', text: 'IPI' },
	{ value: 'isni', text: 'ISNI' },
	{ value: 'ipn', text: 'IPN' },
	{ value: 'actions', text: 'aaas' },
]

const songs = directus.items('songs')
const data = await songs.readByQuery({ limit: 10 })
const items = data.data
</script>
