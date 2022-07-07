<template lang="pug">
PageTopbar
.p-6.pt-8
	.mb-8
		PageHeading
	div(class='grid grid-cols-3 gap-6 mb-8')
		div
			TwCardList
		.col-span-2
			TwCardList
	.mb-8
		TwCardTable
</template>

<script setup>
definePageMeta({
	middleware: ['auth'],
})
</script>
