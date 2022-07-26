<template>
	<div class="bg-white shadow overflow-hidden sm:rounded">
		<TwCard title="Hipgnosis information">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2">
				<TwList :headers="leftHeaders" :item="item" />
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
	{ value: 'hipgnosis_fund', text: 'Hipnosis Fund' },
	{ value: 'hipgnosis_entity', text: 'Hipnosis Entity.entity_name' },
	{ value: 'catalog.catalog_number', text: 'Catalog' },
	{ value: 'catalog.catalogue_name', text: 'Catalog Name' },
]
const rightHeaders = [
	{ value: 'number_of_song_schedules', text: 'Song schedules' },
	{ value: 'agreement_party.', text: 'Argreement Party' },
	{ value: 'argreement_party_name', text: 'Argreement Party Name' },
]
const fields = [
	'song_name',
	...leftHeaders.concat(rightHeaders).map((e) => e.value),
]
const songs = directus.items('songs')
const item = await songs.readOne(props.id, { fields })
</script>
