<template>
	<div class="overflow-auto inline-block min-w-full align-middle">
		<div :class="`shadow-${shadow}`" :style="(styles as CSSProperties)">
			<table class="min-w-full divide-y divide-gray-300">
				<thead v-if="!hideHeader">
					<tr :class="{ 'divide-x divide-gray-200': verticalLines }">
						<th
							v-for="header in normalizedHeaders"
							:key="`th-${header?.key}`"
							class="py-4 px-3 has-tooltip"
							scope="col"
						>
							<slot :name="`header-${header.key}`" :header="header">
								<span
									class="tooltip -mt-8 py-1 px-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity dark:bg-gray-700"
								>
									{{ get(header, 'tooltip', get(header, 'label')) }}
								</span>
								{{ get(header, 'label', '-') }}
							</slot>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					<tr
						v-for="(item, index) in items"
						:key="`tr-${index}`"
						:class="{
							'hover:bg-gray-100 cursor-pointer': clickable,
							'bg-gray-50': stripedRow && index % 2 === 0,
							'divide-x divide-gray-200': verticalLines,
						}"
						@click="onRowClick(item)"
					>
						<td
							v-for="header in normalizedHeaders"
							:key="`td-${header}`"
							class="whitespace-nowrap py-4 px-3 text-gray-900"
							:style="getStyles(header ?? {})"
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
								class="` whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6 md:pl-0 text-center text-gray-400 `"
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
import { CSSProperties } from 'vue'
import { TableHeader } from '~/shared/types'
import getStyles from '~~/composables/utils/get-styles'

const props = defineProps<{
	headers: (string | Partial<TableHeader>)[]
	items?: Record<string, any>[]
	rowClick: (item: any) => void
	hideHeader: boolean
	minRow?: number
	styles?: Record<string, any>
	shadow?: string
	verticalLines?: boolean
	stripedRow?: boolean
}>()

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers
		.map((header: any) =>
			header instanceof Object ? header : { key: header, label: header }
		)
		.filter((header: any) => !header.hidden)
})

const clickable = !!props.rowClick
const { get } = useLodash()
function onRowClick(item) {
	if (props.rowClick) props.rowClick(item)
}
</script>
<style scoped>
.tooltip {
	@apply invisible absolute;
}

.has-tooltip:hover .tooltip {
	@apply visible z-50 opacity-100;
}
</style>
