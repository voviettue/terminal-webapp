<template>
	<Disclosure
		as="div"
		class="flex-row sm:inline-flex items-center border-transparent cursor-pointer sm:relative"
		@click="open = !open"
	>
		<div
			:class="`p-4 py-2 border-transparent border-l-4 flex items-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 hover:sm:bg-inherit sm:border-l-0 sm:p-0`"
		>
			<TwIcon
				v-if="menu.icon"
				:name="menu.icon"
				class="text-green text-xl mr-2"
			></TwIcon>
			{{ menu.label }}
		</div>

		<DisclosurePanel
			v-show="open"
			static
			class="bg-white ml-4 sm:ml-0 sm:absolute sm:top-[100%] sm:mt-1 sm:min-w-[200px] sm:shadow sm:rounded-lg"
		>
			<div v-for="childMenu in childMenus" :key="childMenu.id">
				<RenderMenu
					:menu="childMenu"
					:nested="true"
					class="p-4 py-2 w-full sm:p-4 sm:py-2"
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
const open = ref(false)
const childMenus = settingStore.menus.filter((e) => e.parent === props.menu.id)
</script>
