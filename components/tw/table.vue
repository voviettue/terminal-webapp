<template>
	<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
			<table class="min-w-full divide-y divide-gray-300">
				<thead>
					<tr>
						<th
							v-for="header in normalizedHeaders"
							:key="`th-${header?.value}`"
							class="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 py-3.5 sm:pl-6 md:pl-0"
							scope="col"
						>
							<slot :name="`header-${header?.value}`" :header="header">
								{{ header?.text }}
							</slot>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					<tr v-for="(item, index) in items" :key="`tr-${index}`">
						<td
							v-for="header in normalizedHeaders"
							:key="`td-${header}`"
							class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 md:pl-0"
						>
							<slot :name="`item-${header?.value}`" :item="item">
								{{ item?.[header?.value] }}
							</slot>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
interface TableHeader {
	value: string
	text: string
}

const props = defineProps<{
	headers: (string | Partial<TableHeader>)[]
	items?: Record<string, any>[]
}>()

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers.map((header: any) =>
		header instanceof Object ? header : { value: header, text: header }
	)
})
</script>
