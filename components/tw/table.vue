<template>
	<div class="w-full inline-block align-middle">
		<div
			:class="`overflow-auto shadow-${shadow}`"
			:style="{ ...styles, height: height, 'min-height': minHeight }"
		>
			<table ref="table" :class="tableClass">
				<thead v-if="!hideHeader" class="sticky top-0 z-10">
					<tr :class="{ 'divide-x divide-gray-200': verticalLines }">
						<th
							v-for="header in normalizedHeaders"
							:key="`th-${header?.key}`"
							v-tooltip="header?.tooltip"
							:class="thClass(header)"
							:style="header?.thStyle"
							scope="col"
							@click="toggleSort(header)"
						>
							<slot :name="`header-${header.key}`" :header="header">
								<div class="flex">
									<span>{{ get(header, 'label') }}</span>
									<span v-if="header.sortable" class="ml-2 shrink-0">
										<TwIcon
											:name="sortIcon(header)"
											:class="{
												'flex-shrink-0': true,
												'opacity-50': sortBy !== header.key,
											}"
											aria-hidden="true"
										></TwIcon>
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
							:class="tdClass(header)"
							:style="header.tdStyle"
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
										:context="{ $item: item, $value: get(item, header.key) }"
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
import { get } from '~/utils/get-with-arrays'

interface Props {
	headers: (string | Partial<TableHeader>)[]
	items: Record<string, any>[]
	hideHeader: boolean
	styles?: Record<string, any>
	shadow?: string
	verticalLines?: boolean
	stripedRow?: boolean
	minRow?: number
	layout?: 'auto' | 'fixed'
	height?: string
	thClass?: Record<string, any>
	tdClass?: Record<string, any>
	rowClick: (item: any) => void
}
const props = withDefaults(defineProps<Props>(), {
	layout: 'auto',
	styles: null,
	shadow: null,
	minRow: null,
	height: 'auto',
	thClass: null,
	tdClass: null,
})
const emit = defineEmits(['toggleSort'])

const table = ref(null)
const height = ref(props.height)
const minHeight = ref(props.height)
const clickable = !!props.rowClick
const tableClass = {
	'w-full divide-y divide-gray-300 text-left': true,
	'table-auto': true,
	'md:table-fixed': props.layout === 'fixed',
}
const thClass = (header: any) => {
	return {
		'py-4 px-3 has-tooltip select-none': true,
		'cursor-pointer': !!header?.sortable,
		...header?.thClass,
	}
}
const tdClass = (header: any) => {
	return {
		'py-4 px-3 text-gray-900 space-y-2': true,
		...header.tdClass,
	}
}
const normalizedHeaders = computed<Partial<TableHeader>[]>(() => {
	return props.headers.map((header: any) =>
		header instanceof Object ? header : { key: header, label: header }
	)
})
const sortDirection = ref<string>(null)
const sortBy = ref<string>(null)

onUpdated(() => {
	if (props.height === 'auto') {
		setTimeout(() => {
			alignHeightTable()
		}, 1000)
	}
})

function toggleSort(header: any) {
	const state = [null, 'asc', 'desc', null]
	const key = header.key
	const index = sortBy.value === key ? state.indexOf(sortDirection.value) : 0
	sortDirection.value = state[index + 1]
	sortBy.value = sortDirection.value ? key : null
	emit('toggleSort', { key: sortBy.value, direction: sortDirection.value })
}

function sortIcon(header: any) {
	if (sortBy.value !== header.key || sortDirection.value === null)
		return 'unfold_more'
	return sortDirection.value === 'asc' ? 'expand_less' : 'expand_more'
}

function alignHeightTable() {
	const h = table.value.offsetHeight
	if (minHeight.value === 'auto' || h > parseInt(minHeight.value)) {
		minHeight.value = `${h}px`
	}
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
