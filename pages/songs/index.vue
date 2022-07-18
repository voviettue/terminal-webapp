<template>
	<div class="space-y-8">
		<h1
			class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
		>
			Songs
		</h1>
		<SongList></SongList>
	</div>
</template>

<script setup>
definePageMeta({
	title: 'List Song',
	middleware: ['auth'],
})
</script>
