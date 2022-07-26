<template>
	<PageWrapper>
		<template #breadcrumb>SONG SUMMARY</template>
		<template #title>{{ item.song_name }}</template>

		<div
			class="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:justify-items-stretch lg:space-y-0"
		>
			<div>
				<SongGeneral :id="id" class="h-full" />
			</div>
			<div class="lg:col-span-2">
				<SongSummary :id="id" class="h-full" />
			</div>
		</div>

		<SongPublisherShare :id="id" />
		<SongWriterShare :id="id" />
		<SongCollectibleShare :id="id" />
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
