<template>
	<div class="w-full inline-block align-middle">
		<div
			:class="`overflow-auto shadow-${shadow}`"
			:style="{ ...styles, height: height }"
		>
			<table
				ref="table"
				:class="`${
					layout === 'fixed' ? 'table-fixed' : 'table-auto'
				} w-full divide-y divide-gray-300 text-left`"
			>
				<thead v-if="!hideHeader" class="sticky top-0 bg-white z-10">
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
									{{ get(header, 'tooltip') ?? get(header, 'label') }}
								</span>
								<div class="inline-flex items-center">
									<span>{{ get(header, 'label') ?? '-' }}</span>
									<span
										v-if="
											sortable && !['button'].includes(get(header, 'display'))
										"
										class="ml-1 rounded text-gray-900 hover:bg-gray-300"
										@click="toggleSort(header)"
									>
										<NuxtIcon
											:name="
												(get(header, 'sortDirection') ?? 'asc') === 'asc'
													? 'chevron-down'
													: 'chevron-up'
											"
											class="flex-shrink-0"
											aria-hidden="true"
										></NuxtIcon>
									</span>
								</div>
							</slot>
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white z-1">
					<tr
						v-for="(item, index) in items"
						:key="`tr-${Math.random()}-${index}`"
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
							class="py-4 px-3 text-gray-900"
							:style="getStyles(header ?? {})"
						>
							<slot
								:name="`item-${header?.key}`"
								:item="item"
								:value="get(item, header.key)"
							>
								<template v-if="header?.display">
									<RenderDisplay
										:name="header.display"
										:value="get(item, header.key)"
										:options="header?.displayOptions"
										:context="{ $item: item }"
									></RenderDisplay>
								</template>
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
								class="py-4 pl-4 pr-3 text-gray-900 sm:pl-6 md:pl-0 text-center text-gray-400"
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
import { onUpdated } from 'vue'
import { TableHeader } from '~/shared/types'

interface Props {
	headers: (string | Partial<TableHeader>)[]
	items: Record<string, any>[]
	rowClick: (item: any) => void
	hideHeader: boolean
	sortable: boolean
	styles?: Record<string, any>
	shadow?: string
	verticalLines?: boolean
	stripedRow?: boolean
	layout?: 'auto' | 'fixed'
	height?: string
}
const props = withDefaults(defineProps<Props>(), {
	layout: 'auto',
	styles: null,
	shadow: null,
	height: 'auto',
})

const emit = defineEmits(['toggleSort'])
const { getStyles } = useUtils()
const { get } = useLodash()
const table = ref(null)
const height = ref(props.height)
const clickable = !!props.rowClick

const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers
		.map((header: any) =>
			header instanceof Object ? header : { key: header, label: header }
		)
		.filter((header: any) => !header.hidden)
})

onUpdated(() => {
	if (props.height === 'auto') {
		alignHeightTable()
	}
})

function alignHeightTable() {
	const h = table.value.offsetHeight
	if (height.value === 'auto' || h > parseInt(height.value)) {
		height.value = `${h}px`
	}
}

function toggleSort(header: any) {
	emit('toggleSort', {
		key: header.key,
		direction:
			(get(header, 'sortDirection') ?? 'asc') === 'asc' ? 'desc' : 'asc',
	})
}

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
