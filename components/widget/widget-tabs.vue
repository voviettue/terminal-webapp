<template>
	<div :style="styles" class="bg-white px-4 py-6 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<TabGroup :selected-index="selectedIndex" @change="onTabSelected">
				<div class="sm:hidden">
					<FormKit
						:value="selectedIndex"
						type="select"
						name="tabs"
						:options="optionTabs"
						@input="onTabSelected"
					></FormKit>
				</div>
				<div class="hidden sm:block">
					<div class="border-b border-gray-200">
						<TabList class="-mb-px flex space-x-8">
							<template v-for="tab in tabs">
								<Tab
									v-if="!tab.hidden"
									:key="tab.key"
									v-slot="{ selected }"
									as="template"
								>
									<button
										:class="[
											selected
												? 'border-indigo-500 text-indigo-600'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
											'flex whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
										]"
										:aria-current="selected ? 'page' : undefined"
									>
										<TwIcon
											v-if="tab.icon"
											:name="tab.icon"
											class="icon text-xl h-5 w-5 mr-2 -ml-0.5 group-hover:text-gray-500"
										></TwIcon>
										{{ tab.label }}
									</button>
								</Tab>
							</template>
						</TabList>
					</div>
				</div>
				<TabPanels class="mt-10">
					<template v-for="tab in tabs">
						<TabPanel v-if="!tab.hidden" :key="`tab-${tab.key}`">
							<div
								class="lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6 content-start"
							>
								<RenderWidget
									v-for="item in getListWidgetInTab(tab)"
									:key="`tab-${tab.key}-widget-${item.id}`"
									:widget="item"
								></RenderWidget>
							</div>
						</TabPanel>
					</template>
				</TabPanels>
			</TabGroup>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { TabsWidget, TabItem, Widget } from '~/shared/types'

interface Props {
	widget: TabsWidget
}
const props: any = defineProps<Props>()
const widgets: Widget[] = inject('widgets')

const { getStyles } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const tabs = ref([])
const selectedIndex = ref(0)
const styles = getStyles(props.widget?.options)

const optionTabs = computed(() => {
	return (
		tabs.value?.map((e: TabItem, index: number) => ({
			label: e.label,
			value: index,
		})) || []
	)
})

function getListWidgetInTab(tab: TabItem) {
	return (
		widgets?.filter(
			(e: Widget) =>
				e.parent === props.widget.id && tab?.widgets?.includes(e?.id)
		) || []
	)
}

function onTabSelected(value) {
	selectedIndex.value = value
	const tab = tabs.value[value]

	if (!props.widget?.onTabSelected) return
	const context = { ...pageStore.context, $item: tab }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onTabSelected)
	fn(...Object.values(context))
}

// Handler logic
tabs.value = props.widget?.options?.tabs?.filter((e) => !e.hidden)
selectedIndex.value =
	tabs.value?.findIndex(
		(e: TabItem) => e.key === props.widget?.options?.tabDefault
	) || 0
</script>

<style scoped lang="scss">
button {
	&:focus-within {
		outline: none;
	}
}
</style>
