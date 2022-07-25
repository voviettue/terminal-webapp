<template>
	<PageWrapper>
		<template #breadcrumb>SONG SUMMARY</template>
		<template #title>{{ item.song_name }}</template>

		<div class="grid grid-cols-3 gap-6">
			<div>
				<SongGeneral :id="id" />
			</div>
			<div class="col-span-2">
				<SongRoyalties :id="id" />
			</div>
		</div>

		<SongShareTables :id="id" />
		<SongSynchRequests :id="id" />
		<SongInformation :id="id" />
		<SongHipgnosisInfo :id="id" />
	</PageWrapper>
</template>

<script setup>
definePageMeta({
	title: 'Song summary',
	middleware: ['auth'],
})
const route = useRoute()
const directus = useDirectus()

const id = route.params.id
const fields = ['song_name']
const songs = directus.items('songs')
const item = await songs.readOne(id, { fields })
</script>
