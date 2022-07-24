<template>
	<div class="bg-white shadow overflow-hidden rounded-lg">
		<div v-if="title || description" class="p-4 sm:px-6 lg:px-8">
			<div class="sm:flex sm:items-center">
				<div class="sm:flex-auto">
					<slot name="title">
						<h1 v-if="title" class="text-xl font-medium text-gray-800">
							{{ title }}
						</h1>
					</slot>

					<slot name="description">
						<p v-if="description" class="mt-2 text-sm text-gray-700">
							{{ description }}
						</p>
					</slot>
				</div>
			</div>
		</div>
		<div :class="bodyPadding ? 'p-4 sm:px-6 lg:px-8 pt-0' : ''">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		title?: string
		description?: string
		bodyPadding?: boolean
	}>(),
	{
		title: undefined,
		description: undefined,
		bodyPadding: true,
	}
)
</script>
