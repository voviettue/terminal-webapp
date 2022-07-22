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
