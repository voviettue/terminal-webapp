<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<nav class="flex items-center justify-between">
		<div class="full-w flex flex-1 items-center justify-between">
			<div class="mr-2">
				<p class="text-sm text-gray-700 py-2">
					Showing
					{{ ' ' }}
					<span class="font-medium">{{ offset + 1 }}</span>
					{{ ' ' }}
					to
					{{ ' ' }}
					<span class="font-medium">
						{{ offset + limit >= total ? total : offset + limit }}
					</span>
					{{ ' ' }}
					of
					{{ ' ' }}
					<span class="font-medium">{{ total }}</span>
					{{ ' ' }}
					results
				</p>
			</div>
			<div>
				<nav
					class="isolate inline-flex -space-x-px rounded-md shadow-sm"
					aria-label="Pagination"
				>
					<button
						:disabled="page === 1"
						:class="`page px-1 sm:px-2 rounded-l-md ${
							page === 1 ? 'disabled' : ''
						}`"
						@click="toPage(page - 1)"
					>
						<span class="sr-only">Previous</span>
						<TwIcon
							name="arrow_left"
							class="icon text-2xl"
							aria-hidden="true"
						/>
					</button>
					<button
						v-for="i of visiblePages"
						:key="`page-${i}`"
						:class="{ 'page hidden sm:block': true, active: i === page }"
						aria-current="page"
						@click="toPage(i)"
					>
						{{ i }}
					</button>
					<button
						class="page block sm:hidden disabled px-3 !min-w-[68px]"
						aria-current="page"
						disabled
					>
						<b>{{ page }}</b>
						/
						<small>{{ pageTotal }}</small>
					</button>
					<button
						:disabled="page === pageTotal"
						:class="`page px-1 sm:px-2 rounded-r-md ${
							page === pageTotal ? 'disabled' : ''
						}`"
						@click="toPage(page + 1)"
					>
						<span class="sr-only">Next</span>
						<TwIcon
							name="arrow_right"
							class="icon text-2xl"
							aria-hidden="true"
						/>
					</button>
				</nav>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

interface Props {
	total: number
	page: number
	limit: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update:page'])

const pageTotal = ref(0)
const visiblePages = ref([])
const offset = ref(0)

function toPage(n) {
	if (n < 1 || n > pageTotal) return
	emit('update:page', n)
}

watchEffect(() => {
	const pages = []
	const start: number =
		props.page + 3 > pageTotal.value ? pageTotal.value - 6 : props.page - 3
	pageTotal.value = Math.ceil(props.total / props.limit)
	offset.value = (props.page - 1) * props.limit

	// console.log({start, end, limit: props.limit, total: props.total,})
	for (let i = start; i <= pageTotal.value; i++) {
		if (pages.length === 7) break
		if (i > 0 && i <= pageTotal.value) pages.push(i)
	}
	visiblePages.value = pages
})
</script>

<style scoped>
.page {
	@apply relative items-center border border-gray-300 bg-white py-1 sm:py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20;
	min-width: 40px;
}
.page.disabled .icon {
	opacity: 0.4;
}

.active {
	@apply bg-indigo-50 text-indigo-600 hover:bg-indigo-50;
}
</style>
>
