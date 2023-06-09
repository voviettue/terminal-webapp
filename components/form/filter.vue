<template>
	<div class="flex justify-end">
		<div class="inline-flex gap-2">
			<div v-if="activeSearch">
				<FormKit
					type="search"
					:delay="1000"
					name="search"
					prefix-icon="search"
					placeholder="Search..."
					@input="inputSearch"
				/>
			</div>
			<div v-if="activeFilter">
				<div class="relative inline-block text-left">
					<div>
						<button
							class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							@click="filterActive = !filterActive"
						>
							<TwIcon
								name="filter_alt"
								class="icon text-xl text-gray-500"
								aria-hidden="true"
							></TwIcon>
							<span
								v-if="filterCount"
								class="absolute -top-2 -right-2 drop-shadow-xl items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600"
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
							class="w-full absolute right-0 z-50 mt-2 p-4 w-max origin-top-right rounded-md bg-white drop-shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
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
							<div
								class="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mt-4"
							>
								<button
									class="inline-flex items-center gap-1 text-sm bg-transparent text-gray-600 hover:text-gray-900 leading-tight uppercase"
									@click="addFilterRow"
								>
									<TwIcon
										name="add_circle"
										class="icon text-xl"
										aria-hidden="true"
									></TwIcon>
									ADD FILTER
								</button>
								<div class="flex justify-between gap-4">
									<button
										class="btn light sm shadow-md rounded-md text-sm font-medium"
										@click="clearFilter"
									>
										CLEAR
									</button>
									<button
										class="btn primary sm shadow-md rounded-md text-sm font-medium"
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
	filters.value = filters.value.filter(
		(filter: any) => filter.field && filter.operator
	)
	if (filters.value.length === 2)
		filters.value[0].condition = filters.value[1].condition

	const andConditions = []
	const orConditions = []
	filters.value.forEach((filter: any) => {
		switch (filter.condition) {
			case '_and':
				andConditions.push({
					[filter.field]: {
						[`_${filter.operator}`]: filter.value,
					},
				})
				break

			case '_or':
				orConditions.push({
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
				return undefined
		}
	})

	const conditions = {
		_and: [...andConditions],
	}

	if (orConditions.length) {
		conditions._and.push({
			_or: [...orConditions],
		})
	}

	emit('update:filter', conditions)
	filterActive.value = false
}

function clearFilter() {
	filters.value = [{ ...defaultRow }]
	filterActive.value = false

	emit('update:filter', null)
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

<style>
.formkit-prefix-icon {
	width: 1.25em;
	@apply text-gray-500;
}
</style>
