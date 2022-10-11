<template>
	<div id="page-wrapper" class="px-6 pt-6 pb-16">
		<div class="container mx-auto space-y-6" :style="styles">
			<div v-if="hasSlotBreadCrumb" class="text-sm text-gray-500 mb-2">
				<slot name="breadcrumb"></slot>
			</div>
			<h1 v-if="hasSlotTitle" class="text-gray-900 sm:truncate">
				<slot name="title"></slot>
			</h1>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { Page } from '~/shared/types'

const props = defineProps<{
	page: Page
}>()

const slots = useSlots()
const { getStyles } = useUtils()
const hasSlotBreadCrumb = computed(() => slots?.breadcrumb !== undefined)
const hasSlotTitle = computed(() => slots?.title !== undefined)
const styles = getStyles(props.page?.options)
</script>
