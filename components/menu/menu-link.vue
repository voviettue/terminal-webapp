<template>
	<NuxtLink
		:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm`"
		:to="url"
	>
		{{ label }}
	</NuxtLink>
</template>

<script setup lang="ts">
interface Props {
	label: string
	url: string
}

defineProps<Props>()
</script>
