<template>
	<div class="flex justify-end">
		<div class="inline-flex">
			<div v-if="activeSearch" class="cols">
				<FormKit
					type="text"
					:delay="1000"
					name="search"
					placeholder="Search..."
					@input="inputSearch"
				/>
			</div>
			<div v-if="activeFilter" class="ml-2">
				<div class="relative inline-block text-left">
					<div>
						<button
							class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							@click="filterActive = !filterActive"
						>
							<TwIcon
								name="filter_list"
								class="icon text-xl"
								aria-hidden="true"
							></TwIcon>
							<span
								class="absolute -top-2 -right-2 drop-shadow-xl items-center rounded-full bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-800"
							>
								{{ filterCount }}
							</span>
						</button>
					</div>
					<transition
						enter-active-class="transition ease-out duration-100"
						enter-from-class="transform opacity-0 scale-95"
						enter-to-class="transform opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75"
						leave-from-class="transform opacity-100 scale-100"
						leave-to-class="transform opacity-0 scale-95"
					>
						<div
							v-if="filterActive"
							class="table w-full absolute right-0 z-50 mt-2 p-4 w-max origin-top-right rounded-md bg-white drop-shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<FormFilterRow
								v-for="(filterRow, index) in filters"
								:key="`filter-row_${index}`"
								:filter-row="filterRow"
								:fields="fields"
								:index="index"
								@update="updateFilterRow($event, index)"
								@remove="removeFilterRow"
							></FormFilterRow>
							<div class="flex justify-between items-center mt-4">
								<button
									class="btn secondary inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
									@click="addFilterRow"
								>
									<TwIcon
										name="add"
										class="icon text-xl"
										aria-hidden="true"
									></TwIcon>
									ADD FILTER
								</button>
								<div class="flex justify-between gap-4">
									<button
										class="btn inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
										@click="clearFilter"
									>
										CLEAR
									</button>
									<button
										class="btn primary inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
										@click="applyFilter"
									>
										APPLY
									</button>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Filter } from '@directus/shared/types'

interface Props {
	activeSearch: boolean
	activeFilter: boolean
	filter: Filter
	fields: string[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>()

const emit = defineEmits(['update:search', 'update:filter'])

function inputSearch(value: any) {
	emit('update:search', value)
}

const filterActive = ref(false)

const defaultRow = {
	condition: '_and',
	field: '',
	operator: '',
	value: null,
}
const filters = ref<any[]>([{ ...defaultRow }])
const filterCount = computed(() => {
	let counter = 0
	filters.value.forEach((filter: any) => {
		if (filter.field && filter.operator) counter++
	})

	return counter
})

function applyFilter() {
	const conditions = []
	filters.value.forEach((filter: any) => {
		if (!filter.field || !filter.operator) return {}

		switch (filter.condition) {
			case '_and':
				conditions.push({
					[filter.field]: {
						[`_${filter.operator}`]: filter.value,
					},
				})
				break

			case '_or':
				conditions.push({
					[filter.condition]: [
						{
							[filter.field]: {
								[`_${filter.operator}`]: filter.value,
							},
						},
					],
				})
				break

			default:
				return {}
		}
	})

	emit('update:filter', { _and: conditions })
	filterActive.value = false
}

function clearFilter() {
	for (let i = 0; i < filters.value.length; i++) {
		filters.value[i] = { ...defaultRow }
	}
}

function addFilterRow() {
	filters.value.push({ ...defaultRow })
}

function updateFilterRow(filterRow: any, index: number) {
	filters.value[index] = { ...filterRow }
}

function removeFilterRow(index: number) {
	if (index === 0) {
		filters.value[0] = {}
	} else {
		filters.value.splice(index, 1)
	}
}
</script>

<style scoped></style>
