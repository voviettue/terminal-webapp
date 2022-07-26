<template>
	<div class="space-y-8">
		<h1
			class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
		>
			Deals
		</h1>
		<DealList></DealList>
	</div>
</template>

<script setup>
definePageMeta({
	title: 'List Deal',
	middleware: ['auth'],
})
</script>
