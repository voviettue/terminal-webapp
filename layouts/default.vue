<template>
	<div id="layout-wrapper">
		<PageTopbar class="mb-6"></PageTopbar>
		<div class="container mx-auto px-4">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()

useHead({
	title: `${route.meta.title}`,
})
</script>
