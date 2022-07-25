<script setup>
definePageMeta({
	title: 'List Acquisitions',
	middleware: ['auth'],
})
</script>
<template>
	<PageWrapper>
		<template #title>Acquisitions</template>
		<AcquisitionList></AcquisitionList>
	</PageWrapper>
</template>
