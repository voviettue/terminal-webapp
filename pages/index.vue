<template>
	<div></div>
</template>

<script lang="ts" setup>
const { usePageStore } = useStore()
const pageStore = usePageStore()
const page = pageStore.homepage
navigateTo(page ? page.endpoint : '/homepage')
</script>
