<template>
	<div class="lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6">
		<div class="lg:col-span-2 bg-blue-200 p-4 h-[160px]">Widget 2 column</div>
		<div class="lg:col-span-3 bg-blue-200 p-4 h-[160px]">Widget 3 column</div>
		<div class="lg:col-span-1 bg-blue-200 p-4 h-[160px]">Widget 1 column</div>
		<div class="lg:col-span-6 bg-blue-200 p-4 h-[160px]">Widget full</div>
		<div class="lg:col-span-3 bg-blue-200 p-4 h-[160px]">Widget half</div>
		<div class="lg:col-span-3 bg-blue-200 p-4 h-[160px]">Widget half</div>
	</div>
</template>

<script setup lang="ts">
import { Page } from '~/shared/types'

interface Props {
	params: object | null
	page?: Page
}

defineProps<Props>()
</script>
