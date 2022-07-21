<template>
	<div class="mb-16">
		<div v-if="hasSlotBreadCrumb" class="text-sm text-gray-500 mb-2">
			<slot name="breadcrumb"></slot>
		</div>
		<div class="space-y-6">
			<h1
				v-if="hasSlotTitle"
				class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
			>
				<slot name="title"></slot>
			</h1>

			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { useSlots } from 'vue'

const slots = useSlots()
const hasSlotBreadCrumb = computed(() => slots?.breadcrumb !== undefined)
const hasSlotTitle = computed(() => slots?.title !== undefined)
</script>
