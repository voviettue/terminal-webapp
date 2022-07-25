<template>
	<TwCard title="General song information" description="">
		<TwList :headers="headers" :item="item" />
	</TwCard>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const directus = useDirectus()

const headers = [
	{ value: 'song_id', text: 'Song Number' },
	{ value: 'artist.contact_name', text: 'Artist' },
	{ value: 'type', text: 'Type' },
	{ value: 'is_derivative', text: 'Is Derivative' },
	{ value: 'release_date', text: 'Release Date' },
	{ value: 'primary_work.song_id', text: 'Primary Work ID' },
	{ value: 'label.entity_name', text: 'Label' },
]
const fields = ['song_name', ...headers.map((e) => e.value)]
const songs = directus.items('songs')
const item = await songs.readOne(props.id, { fields })
</script>
