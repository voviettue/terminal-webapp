<template>
	<PageWrapper>
		<template #breadcrumb>SONG SUMMARY</template>
		<template #title>{{ item.song_name }}</template>

		<div class="grid grid-cols-3 gap-6">
			<div>
				<TwCard title="General song information" description="">
					<TwList :headers="headers" :item="item" />
				</TwCard>
			</div>
			<div class="col-span-2">
				<TwCard title="Title B" description="Description ...">
					<TwList :headers="['name', 'description']" :item="item"></TwList>
				</TwCard>
			</div>
		</div>

		<SongShareTables></SongShareTables>
	</PageWrapper>
</template>

<script setup>
definePageMeta({
	title: 'Song 1',
	middleware: ['auth'],
})
const directus = useDirectus()
const route = useRoute()
const id = route.params.id

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
const item = await songs.readOne(id, { fields })
</script>
