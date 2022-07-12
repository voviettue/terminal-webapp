<template>
	<div>
		<PageTopbar></PageTopbar>
		<div class="p-8">
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
