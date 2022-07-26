<template>
	<PageWrapper>
		<template #title>Deals</template>
		<DealList></DealList>
	</PageWrapper>
</template>

<script setup>
definePageMeta({
	title: 'List Deal',
	middleware: ['auth'],
})
</script>
