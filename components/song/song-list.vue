<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard>
			<CollectionTable
				:collection="collection"
				:headers="headers"
				:fields="fields"
				:row-click="(item) => navigateTo(`/songs/${item.id}`)"
			/>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const collection = 'songs'
const headers = [
	{ value: 'song_id', text: 'Song ID' },
	{ value: 'song_name', text: 'Song Name' },
	{ value: 'artist.contact_name', text: 'Artist' },
	{ value: 'release_date', text: 'Release Date', display: 'date' },
	{ value: 'type', text: 'Type' },
]
const fields = ['id', ...headers.map((e) => e.value)]
</script>
