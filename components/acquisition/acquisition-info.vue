<template>
	<div>
		<TwCard title="Deal Description" class="mb-5">
			<p class="text-sm">
				{{ data.catalog_headline }}
			</p>
		</TwCard>
		<div class="grid grid-cols-2 gap-6 mb-5">
			<TwMedia icon="thermometer">
				<template #description>
					<p>Catalogue Status</p>
					<p class="font-bold">
						{{
							list['catalog_status']?.find(
								(l) => l.value === data.catalog_status
							)?.text || '—'
						}}
					</p>
				</template>
			</TwMedia>
			<TwMedia icon="calendar">
				<template #description>
					<p>Acquisition Date</p>
					<p class="font-bold">
						<RenderDisplay
							name="date"
							:value="data.acquisition_date"
							:options="{ format: 'PPP' }"
						></RenderDisplay>
					</p>
				</template>
			</TwMedia>
		</div>
		<TwCard title="Additional comments" class="mb-5">
			<div v-if="data.notes" v-html="data.notes"></div>
		</TwCard>
	</div>
</template>
<script setup lang="ts">
interface PropType {
	data: Record<string, any>
	list: Record<string, any>
}
withDefaults(defineProps<PropType>(), {
	data: () => ({
		catalog_headline: '',
		catalog_status: '',
		notes: '',
		acquisition_date: '',
	}),
	list: () => ({}),
})
</script>
