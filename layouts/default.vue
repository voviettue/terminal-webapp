<template>
	<div id="layout-wrapper">
		<PageTopbar class="mb-6"></PageTopbar>
		<div class="container overflow-hidden mx-auto px-4">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const { useUserStore, useSettingStore } = useStore()
const { hydrate: userHydrate } = useUserStore()
const { hydrate: settingHydrate } = useSettingStore()

useHead({
	title: `${route.meta.title}`,
})

await init()

async function init() {
	try {
		await Promise.all([userHydrate(), settingHydrate()])
	} catch (err) {
		// do nothing
	}
}
</script>
