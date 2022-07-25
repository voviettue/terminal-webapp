<template>
	<PageWrapper>
		<h1>Dashboard</h1>

		<TabGroup>
			<div class="border-b border-gray-200">
				<TabList class="-mb-px flex space-x-8">
					<Tab
						v-for="tab in tabs"
						:key="tab.label"
						v-slot="{ selected }"
						as="template"
					>
						<a
							:class="[
								selected
									? 'border-indigo-500 text-indigo-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer',
								'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
							]"
						>
							{{ tab.label }}
						</a>
					</Tab>
				</TabList>
			</div>
			<TabPanels>
				<TabPanel v-for="tab in tabs" :key="`tab-panel-${tab.label}`">
					<div class="aspect-square">
						<iframe
							:src="tab.src"
							class="min-h-[500px]"
							width="100%"
							height="100%"
							allowfullscreen
						></iframe>
					</div>
				</TabPanel>
			</TabPanels>
		</TabGroup>
	</PageWrapper>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

definePageMeta({
	title: 'Dashboard',
	middleware: ['auth'],
})

const tabs = [
	{
		label: 'Synch Deal',
		src: 'https://app.powerbi.com/reportEmbed?reportId=75b7b39f-4103-4488-bbb8-fb1028899488&autoAuth=true&ctid=0ce2e605-da89-440d-90d5-d89219937ca4&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1rLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',
	},
	{
		label: 'Synch Pitch',
		src: 'https://app.powerbi.com/reportEmbed?reportId=189b4c19-9480-435b-b017-ef8362e90596&autoAuth=true&ctid=0ce2e605-da89-440d-90d5-d89219937ca4&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1rLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',
	},
	{
		label: 'Synch Report',
		src: 'https://app.powerbi.com/reportEmbed?reportId=71dd76ae-2c4d-4d84-86b9-90bfcce0ff96&autoAuth=true&ctid=0ce2e605-da89-440d-90d5-d89219937ca4&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1rLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',
	},
]
</script>
