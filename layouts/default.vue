<template>
	<div id="layout-wrapper">
		<PageTopbar></PageTopbar>
		<div class="container mx-auto px-4 py-6">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const { useUserStore, useSettingStore, usePageStore } = useStore()
const { hydrate: userHydrate } = useUserStore()
const { hydrate: pageHydrate } = usePageStore()
const { hydrate: settingHydrate } = useSettingStore()

useHead({
	title: `${route.meta.title}`,
})

await init()

async function init() {
	try {
		await Promise.all([userHydrate(), settingHydrate(), pageHydrate()])
	} catch (err) {
		// do nothing
	}
}
</script>
