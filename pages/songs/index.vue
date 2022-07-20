<template>
	<PageWrapper>
		<template #title>Songs</template>
		<SongList></SongList>
	</PageWrapper>
</template>

<script setup>
definePageMeta({
	title: 'List Song',
	middleware: ['auth'],
})
</script>
