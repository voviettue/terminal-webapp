<template>
	<div class="overflow-x-auto">
		<div class="inline-block min-w-full align-middle">
			<table class="min-w-full divide-y divide-gray-300">
				<thead v-if="!hideHeader">
					<tr>
						<th
							v-for="header in normalizedHeaders"
							:key="`th-${header?.key}`"
							class="pl-4 pr-3 text-left py-3.5 sm:pl-6 md:pl-0 font-normal"
							scope="col"
						>
							<slot :name="`header-${header.key}`" :header="header">
								{{ get(header, 'label') ?? '—' }}
							</slot>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					<tr
						v-for="(item, index) in items"
						:key="`tr-${index}`"
						:class="{ 'hover:bg-gray-100 cursor-pointer': clickable }"
						@click="onRowClick(item)"
					>
						<td
							v-for="header in normalizedHeaders"
							:key="`td-${header}`"
							class="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6 md:pl-0"
						>
							<slot
								:name="`item-${header?.key}`"
								:item="item"
								:value="get(item, header.key)"
							>
								<RenderDisplay
									v-if="header?.display"
									:name="header.display"
									:value="get(item, header.key)"
									:options="header?.displayOptions"
								></RenderDisplay>
								<template v-else>
									{{ get(item, header.key) ?? '—' }}
								</template>
							</slot>
						</td>
					</tr>

					<template v-if="!items || items.length === 0">
						<tr>
							<td
								:colspan="headers.length"
								class="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6 md:pl-0 text-center text-gray-400"
							>
								No records found
							</td>
						</tr>
					</template>
					<template v-else-if="minRow > 0 && items.length < minRow">
						<tr v-for="k in minRow - items.length" :key="`pad-row-${k}`">
							<td :colspan="headers.length" class="py-4 opacity-0">—</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TableHeader } from '~/shared/types'

const props = defineProps<{
	headers: (string | Partial<TableHeader>)[]
	items?: Record<string, any>[]
	rowClick: (item: any) => void
	hideHeader: boolean
	minRow?: number
}>()

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers.map((header: any) =>
		header instanceof Object ? header : { key: header, label: header }
	)
})

const clickable = !!props.rowClick
const { get } = useLodash()
function onRowClick(item) {
	if (props.rowClick) props.rowClick(item)
}
</script>
