<template>
	<div class=".border-t border-gray-200">
		<dl class="sm:divide-y sm:divide-gray-200">
			<div
				v-for="header in normalizedHeaders"
				:key="header?.value"
				class="sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4"
			>
				<dt class="text-sm font-medium text-gray-500">
					<slot :name="`header-${header?.value}`">
						{{ get(header, 'text') ?? '—' }}
					</slot>
				</dt>
				<dd class="mt-1 text-sm text-right text-gray-900 sm:mt-0 sm:col-span-2">
					<slot :name="`item-${header?.value}`">
						{{ get(item, `${header?.value}`) ?? '—' }}
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

const { get } = useLodash()
</script>
