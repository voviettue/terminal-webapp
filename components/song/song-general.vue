<template>
	<TwCard title="General song information" description="">
		<TwList :headers="headers" :item="item"></TwList>
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const directus = useDirectus()

const headers = [
	{ value: 'artist.contact_name', text: 'Artist' },
	{ value: 'featured_artist.contact_name', text: 'Featured artist' },
	{ value: 'type', text: 'Type' },
	{ value: 'is_derivative', text: 'Is derivative' },
	{ value: 'release_date', text: 'Release date' },
	{ value: 'primary_work.song_id', text: 'Primary work ID' },
	{ value: 'label.entity_name', text: 'Label' },
]
const fields = ['song_name', ...headers.map((e) => e.value)]
const songs = directus.items('songs')
const item = await songs.readOne(props.id, { fields })
</script>
