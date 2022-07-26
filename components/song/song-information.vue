<template>
	<div class="bg-white shadow overflow-hidden sm:rounded">
		<TwCard title="Song information">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2">
				<TwList :headers="leftHeaders" :item="item">
					<template #[iswcSlot]="{ item }">
						{{ (item.iswc_codes ?? []).map((e) => e?.iswc_code).join(', ') }}
					</template>

					<template #[isrcSlot]="{ item }">
						{{ (item.isrc_codes ?? []).map((e) => e?.isrc_code).join(', ') }}
					</template>
				</TwList>
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
	{ value: 'iswc_codes.iswc_code', text: 'ISWC' },
	{ value: 'isrc_codes.isrc_code', text: 'ISRC' },
]
const rightHeaders = [
	{ value: 'catalogue_manager', text: 'Catalog Manager' },
	{ value: 'publisher_ids.publisher_id', text: 'Co-Pub Work ID' },
]
const fields = [
	'song_name',
	'catalogue_manager.first_name',
	'catalogue_manager.last_name',
	...leftHeaders.concat(rightHeaders).map((e) => e.value),
]
const songs = directus.items('songs')
const item = await songs.readOne(props.id, { fields })
item.catalogue_manager = item?.catalogue_manager
	? item.catalogue_manager?.first_name + ' ' + item.catalogue_manager?.last_name
	: null

const iswcSlot = 'item-iswc_codes.iswc_code'
const isrcSlot = 'item-isrc_codes.isrc_code'
</script>
