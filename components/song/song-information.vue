<template>
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<TwCard title="Song information">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-2">
				<TwList :headers="leftHeaders" :item="item" />
				<TwList :headers="midHeaders" :item="item" />
				<TwList :headers="rightHeaders" :item="item" />
			</div>
		</TwCard>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	id: string | number
}>()

const directus = useDirectus()

const leftHeaders = [
	{ value: 'isrc', text: 'ISRC ??' },
	{ value: 'iswc', text: 'ISWC ??' },
	{ value: 'catalogue_manager.contact_name', text: 'Catalog Manager' },
	{ value: 'listed_on_spotify', text: 'Listed on Spotify ??' },
]
const midHeaders = [
	{ value: 'co_pub_1_work_id', text: 'Co-Pub Work ID ??' },
	{ value: 'new_usage', text: 'New Usage ??' },
	{ value: 'new_usage_received', text: 'New Usage Received ??' },
]
const rightHeaders = [
	{ value: 'pro_1_song_code', text: 'Pro 1 song code ??' },
	{ value: 'pro_2_song_code', text: 'Pro 2 song code ??' },
]
const fields = [
	'song_name',
	...leftHeaders
		.concat(midHeaders)
		.concat(rightHeaders)
		.map((e) => e.value),
]
const songs = directus.items('songs')
const item = await songs.readOne(props.id, { fields })
</script>
