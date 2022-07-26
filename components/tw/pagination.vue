<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<nav
		class="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
	>
		<div class="-mt-px w-0 flex-1 flex">
			<button
				v-if="totalPage > 1 && page > 1"
				:disabled="page === 1"
				href="#"
				class="cursor-pointer border-t-2 border-transparent pt-4 pr-1 inline-flex items-center font-medium hover:border-gray-300"
				@click="toPage(page - 1)"
			>
				<NuxtIcon
					name="arrow-narrow-left"
					class="mr-3 h-5 w-5 text-gray-500"
					aria-hidden="true"
				/>
				Prev
			</button>
		</div>
		<div v-if="totalPage > 1" class="hidden md:-mt-px md:flex">
			<page
				v-for="i of visiblePages"
				:key="`page-${i}`"
				:class="{ 'cursor-pointer': 1, page, active: i === page }"
				aria-current="page"
				@click="toPage(i)"
			>
				{{ i }}
			</page>
		</div>
		<div class="-mt-px w-0 flex-1 flex justify-end">
			<button
				v-if="totalPage > 1 && page < totalPage"
				:disabled="page >= totalPage"
				class="cursor-pointer border-t-2 border-transparent pt-4 pl-1 inline-flex items-center font-medium hover:border-gray-300"
				@click="toPage(page + 1)"
			>
				Next
				<NuxtIcon
					name="arrow-narrow-right"
					class="ml-3 h-5 w-5 text-gray-500"
					aria-hidden="true"
				/>
			</button>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

interface Props {
	totalPage: number
	page: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update:page'])

function toPage(n) {
	if (n < 1 || n > props.totalPage) return
	emit('update:page', n)
}
const visiblePages = ref([])

watchEffect(() => {
	const pages = []
	const start: number = props.page - 3
	for (let i = start; i <= props.totalPage; i++) {
		if (pages.length === 7) break
		if (i > 0 && i <= props.totalPage) pages.push(i)
	}
	visiblePages.value = pages
})
</script>

<style scoped>
.page {
	@apply border-transparent hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium;
}

.active {
	@apply border-indigo-500 text-indigo-600 border-t-2;
}
</style>
>
