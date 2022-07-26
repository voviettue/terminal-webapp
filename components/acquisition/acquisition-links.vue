<template>
	<div>
		<TwCard title="Exclusions" class="mb-5">
			<div v-if="data.exclusions" v-html="data.exclusions"></div>
		</TwCard>
		<TwCard title="Links" class="mb-5">
			<div class="w-full">
				<a
					v-for="(item, index) in links"
					:key="`links_${index}`"
					:href="convertUrl(item.url)"
					target="_blank"
					class="text-sm font-medium text-indigo-600 hover:text-indigo-500 inline-block mr-1"
				>
					{{ item.text }},
				</a>
			</div>
		</TwCard>
	</div>
</template>
<script setup lang="ts">
const directus = useDirectus()
const links = ref([])
const props = withDefaults(defineProps<{ data: Record<string, any> }>(), {
	data: () => ({ exclusions: '' }),
})
// links
async function getLinks(data) {
	if (!data.important_links?.length) return []
	const apiLinks = await directus.items('links').readMany(data.important_links)
	links.value = apiLinks.data.map((item: Record<string, any>) => {
		return {
			text: item.display_text,
			url: item.url,
		}
	})
}

function convertUrl(url) {
	if (/^http?(s):/g.test(url)) return url
	return `http://${url}`
}

onMounted(() => {
	getLinks(props.data)
})
</script>
