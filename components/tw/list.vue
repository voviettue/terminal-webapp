<template>
	<div class=".border-t border-gray-200">
		<dl class="sm:divide-y sm:divide-gray-200">
			<div
				v-for="header in normalizedHeaders"
				:key="header?.value"
				class="p-4 sm:px-6 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 lg:px-8"
			>
				<dt class="text-sm font-medium text-gray-500">
					<slot :name="`header-${header?.value}`">
						{{ header?.text }}
					</slot>
				</dt>
				<dd class="mt-1 text-sm text-right text-gray-900 sm:mt-0 sm:col-span-2">
					<slot :name="`item-${header?.value}`">
						{{ item?.[header?.value] }}
					</slot>
				</dd>
			</div>
		</dl>
	</div>
</template>

<script setup lang="ts">
interface ListHeader {
	value: string
	text: string
}

const props = defineProps<{
	headers: (string | Partial<ListHeader>)[]
	item?: Record<string, any>
}>()

const normalizedHeaders = computed<Partial<ListHeader>[]>(() => {
	return props.headers.map((header: any) =>
		header instanceof Object ? header : { value: header, text: header }
	)
})
</script>
