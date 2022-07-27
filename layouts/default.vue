<template>
	<div id="layout-wrapper">
		<PageTopbar></PageTopbar>
		<div class="container overflow-hidden mx-auto px-4 py-6">
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
