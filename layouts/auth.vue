<template>
	<div>
		<slot></slot>
	</div>
</template>

<script setup>
const route = useRoute()

useHead({
	title: `${route.meta.title}`,
})
</script>
