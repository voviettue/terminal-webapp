<template>
	<TwCard title="Document" class="mb-5">
		<TwTable :headers="docHeader" :items="docs" :row-click="() => {}" />
	</TwCard>
</template>
<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { docHeader } from './constants'
const directus = useDirectus()
const props = defineProps<{ data: Record<string, any> }>()
const docs = ref([])
async function getDocs(data) {
	if (!data.docs?.length) return []
	const apiDocs = await directus.items('catalog_files').readMany([data.docs])
	const arrDocs = apiDocs.data.map((item: Record<string, any>) => {
		return {
			id: item.id,
			file_id: item.directus_files_id,
		}
	})
	const apiFiles = await directus.files.readMany(
		arrDocs.map((doc) => doc.file_id)
	)
	docs.value = apiFiles.data.map((item) => {
		const { title, description, filename_disk, modified_on } = item
		return {
			title,
			description,
			updateAt: modified_on,
			attact: `File.${filename_disk.split('.')[1]}`,
		}
	})
}
onMounted(() => {
	getDocs(props.data)
})
</script>
