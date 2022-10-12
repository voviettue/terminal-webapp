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
const maxWidth = ref('')
await init()

async function init() {
	try {
		await Promise.all([userHydrate(), settingsStore.hydrate(), pageHydrate()])
		const { options, page_options: pageOptions } = settings.value
		customCss.value = options?.custom_css ?? ''

		if (pageOptions?.layoutWidth === 'fluid') {
			maxWidth.value = '100%'
		}
		if (pageOptions?.maxWidth) {
			maxWidth.value = settings.value?.page_options?.maxWidth
		}
		if (maxWidth.value) {
			customCss.value += `\n .container { max-width: ${maxWidth.value} }`
		}
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
