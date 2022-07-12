<template>
	<div>
		<div class="mb-8">
			<PageHeading></PageHeading>
		</div>

		<div class="grid grid-cols-3 gap-6 mb-8">
			<div>
				<Card
					title="Title A"
					description="Description here............."
					:body-padding="false"
				>
					<TwList :headers="['name', 'description']" :item="item">
						<template #header-description>Custom Description</template>
						<template #item-description>
							<button
								class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
								type="button"
							>
								View
							</button>
						</template>
					</TwList>
				</Card>
			</div>
			<div class="col-span-2">
				<Card
					title="Title B"
					description="Description ..."
					:body-padding="false"
				>
					<TwList :headers="['name', 'description']" :item="item"></TwList>
				</Card>
			</div>
		</div>
		<div class="mb-8">
			<DashboardListUser></DashboardListUser>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	title: 'Dashboard',
})

const item = {
	name: 'Omega Mario',
	description: '..............',
}
</script>
