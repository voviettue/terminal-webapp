<template>
	<PageWrapper>
		<template #breadcrumb>SONG SUMMARY</template>
		<template #title>{{ item.song_name }}</template>

		<div class="grid grid-cols-3 gap-6">
			<div>
				<TwCard title="Song information" description="" :body-padding="false">
					<TwList :headers="headers" :item="item" />
				</TwCard>
			</div>
			<div class="col-span-2">
				<TwCard
					title="Title B"
					description="Description ..."
					:body-padding="false"
				>
					<TwList :headers="['name', 'description']" :item="item"></TwList>
				</TwCard>
			</div>
		</div>
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
	{ value: 'release_date', text: 'Release Date' },
	{ value: 'ipi', text: 'IPI' },
	{ value: 'isni', text: 'ISNI' },
	{ value: 'ipn', text: 'IPN' },
]
const songs = directus.items('songs')
const item = await songs.readOne(id)
</script>
