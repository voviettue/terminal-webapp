<template>
	<PageWrapper>
		<template #breadcrumb>ACQUISITION SUMMARY</template>
		<template #title>{{ data.catalog_name }}</template>
		<div class="grid grid-cols-5 gap-6 mb-8 font-sans">
			<div class="col-span-3">
				<AcquisitionInfo :data="data" :list="list"></AcquisitionInfo>
				<AcquisitionDeal :id="data.catalog_id"></AcquisitionDeal>
				<AcquisitionContact :data="data"></AcquisitionContact>
				<AcquisitionDoc :data="data"></AcquisitionDoc>
			</div>
			<div class="col-span-2">
				<AcquisitionDealInfo :data="data" :list="list"></AcquisitionDealInfo>
				<AcquisitionRate :data="data"></AcquisitionRate>
				<AcquisitionWriter :id="id"></AcquisitionWriter>
				<AcquisitionConnect :data="data"></AcquisitionConnect>
				<AcquisitionLinks :data="data"></AcquisitionLinks>
			</div>
		</div>
	</PageWrapper>
</template>
<!-- eslint-disable camelcase -->
<script setup>
definePageMeta({
	middleware: ['auth'],
	title: 'Acquisitions',
})
const directus = useDirectus()
const route = useRoute()
const { id } = route.params
const data = ref({})
const list = ref({})
async function getFields() {
	const catalogFields = await directus
		.items('directus_fields')
		.readOne('catalog')
	list.value = catalogFields.reduce((pre, current) => {
		if (current.meta?.options?.choices)
			pre[current.field] = current.meta?.options?.choices
		return pre
	}, {})
}

const res = await directus.items('catalog').readOne(id)
data.value = res

onMounted(() => {
	getFields()
})

watch(data, () => {
	useHead({
		title: `Acquisitions ${data.value.catalog_name}`,
	})
})
</script>
