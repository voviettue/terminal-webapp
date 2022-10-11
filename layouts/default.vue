<template>
	<div id="layout-wrapper">
		<PageTopbar></PageTopbar>
		<slot></slot>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

const route = useRoute()
const { useUserStore, useSettingStore, usePageStore } = useStore()
const { hydrate: userHydrate } = useUserStore()
const { hydrate: pageHydrate } = usePageStore()
const settingsStore = useSettingStore()
const { settings } = storeToRefs(settingsStore)
useHead({
	title: `${route.meta.title}`,
})

const customCss = ref('')
await init()

async function init() {
	try {
		await Promise.all([userHydrate(), settingsStore.hydrate(), pageHydrate()])
		customCss.value = settings.value?.options?.custom_css
		addCustomCss()
	} catch (err) {
		// do nothing
	}
}

function addCustomCss() {
	if (!customCss.value) return

	const head = document.head
	const style = document.createElement('style')
	style.type = 'text/css'
	style.appendChild(document.createTextNode(customCss.value))
	head.append(style)
}
</script>
