<template>
	<Disclosure
		as="div"
		class="menu !p-0 cursor-pointer flex-col sm:flex-row sm:relative"
		tabindex="0"
		@focusin="state.open = true"
		@focusout="outFocus($event)"
	>
		<div class="w-full px-4 py-2 sm:py-0 sm:px-0 space-x-2">
			<TwIcon
				v-if="menu.icon"
				:name="menu.icon"
				class="icon text-green text-xl"
			></TwIcon>
			<span class="label">{{ menu.label }}</span>
			<span class="tooltip">
				{{ menu.label }}
			</span>
		</div>

		<DisclosurePanel
			v-show="state.open"
			static
			class="bg-white w-full ml-4 sm:ml-0 sm:absolute sm:top-[100%] sm:mt-1 sm:min-w-[200px] sm:shadow sm:rounded-lg"
		>
			<div v-for="childMenu in childMenus" :key="childMenu.id">
				<RenderMenu
					class="p-4 py-2 w-full sm:p-4 sm:py-2"
					:menu="childMenu"
					:nested="true"
					@click="state.open = false"
				/>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosurePanel } from '@headlessui/vue'
import { MenuPage } from '~/shared/types'

interface Props {
	menu: MenuPage
}

const props = defineProps<Props>()

const { useSettingStore } = useStore()
const settingStore = useSettingStore()
const state = useMenu()
const childMenus = settingStore.menus.filter((e) => e.parent === props.menu.id)

function outFocus(e: FocusEvent) {
	if (e.relatedTarget?.classList.contains('menu')) return
	state.value.open = false
}
</script>
