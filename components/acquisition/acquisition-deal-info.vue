<template>
	<TwCard title="Deal information" class="mb-5">
		<TwList :headers="dealInfoHeader" :item="dealInfo">
			<template #item-hipgnosis_fund>
				{{
					list['hipgnosis_fund']?.find((l) => l.value === data.hipgnosis_fund)
						?.text || '—'
				}}
			</template>
			<template #item-hipgnosis_entity>
				{{
					list['hipgnosis_entity']?.find(
						(l) => l.value === data.hipgnosis_entity
					)?.text || '—'
				}}
			</template>
		</TwList>
	</TwCard>
</template>
<script setup lang="ts">
import { dealInfoHeader } from './constants'
const directus = useDirectus()
interface PropType {
	data: Record<string, any>
	list: Record<string, any>
}
const props = withDefaults(defineProps<PropType>(), {
	data: () => ({
		hipgnosis_fund: '',
		hipgnosis_entity: '',
	}),
	list: () => ({}),
})
const dealInfo = ref([])
// Deal Infor
async function getDealInfo(data) {
	let entity = ''
	if (data.vendor_entities?.length) {
		const vendor: Record<string, any> = await directus
			.items('entities')
			.readOne(data.vendor_entities[0])
		entity = vendor.entity_name
	}
	dealInfo.value = {
		...data,
		vendor_entities: entity,
	}
}
onMounted(() => {
	getDealInfo(props.data)
})
</script>
