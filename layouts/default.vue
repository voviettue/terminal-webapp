<template>
	<div id="layout-wrapper">
		<PageTopbar></PageTopbar>
		<slot></slot>
		<!-- <br />
		<div class="w-[200px] mx-auto">
			<br />
			<br />
			<label>Owner:</label>
			<TwDropdown :value="2" :options="options" />
			<br />
			<br />
			<FormKit
				v-model="value"
				label="Owner:"
				type="dropdown"
				validation="required"
				validation-visibility="live"
				:options="options"
			/>
		</div> -->
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
// const value = ref(2)
// const options = ref([
// 	{ value: null, text: 'Select' },
// 	{ value: 1, text: 'Leslie Alexander' },
// 	{ value: 2, text: 'Tu Nguyen' },
// 	{ value: 3, text: 'Tu Nguyen ss' },
// ])
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
