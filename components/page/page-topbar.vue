<template>
	<Disclosure
		v-slot="{ open }"
		as="nav"
		class="bg-white shadow fixed bottom-0 w-full sm:static z-50"
	>
		<div class="mx-auto px-4 md:px-8 bg-white border-t">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div
						class="flex-shrink-0 flex items-center w-16 justify-center background-logo"
					>
						<NuxtLink :to="homePage?.endpoint ?? '/homepage'">
							<img
								class="h-8 w-auto"
								:src="projectLogoImg"
								alt="Project Logo"
							/>
						</NuxtLink>
					</div>
					<div class="hidden sm:ml-4 sm:space-x-6 sm:flex">
						<!-- Current: 'border-indigo-500 text-gray-900', Default: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' -->
						<RenderMenu v-for="menu in menus" :key="menu.id" :menu="menu" />
					</div>
				</div>
				<div class="flex items-center">
					<!-- Profile dropdown -->
					<Menu as="div" class="relative">
						<div>
							<MenuButton
								class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
							>
								<span class="sr-only">Open user menu</span>
								<img
									v-if="!avatarImg"
									class="h-8 w-8 rounded-full"
									:src="avatarImg"
									:alt="user?.avatar?.title || 'User Avatar'"
								/>
								<TwIcon
									v-else
									name="account_circle"
									filled
									class="text-gray-400 hover:text-gray-500 text-4xl rounded-full"
								/>
							</MenuButton>
						</div>
						<transition
							enter-active-class="transition ease-out duration-200"
							enter-from-class="transform opacity-0 scale-95"
							enter-to-class="transform opacity-100 scale-100"
							leave-active-class="transition ease-in duration-75"
							leave-from-class="transform opacity-100 scale-100"
							leave-to-class="transform opacity-0 scale-95"
						>
							<MenuItems
								class="origin-top-right absolute right-0 -mt-[160px] sm:mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<MenuItem v-slot="{ active }" as="div" class="sm:hidden">
									<a
										:href="adminUrl"
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
										]"
									>
										Go to Back Office
									</a>
								</MenuItem>
								<MenuItem v-slot="{ active }" as="div">
									<NuxtLink
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
										]"
									>
										Your Profile
									</NuxtLink>
								</MenuItem>
								<MenuItem v-slot="{ active }" as="div">
									<a
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
										]"
										@click="logout()"
									>
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</transition>
					</Menu>

					<div class="flex items-center sm:hidden">
						<!-- Mobile menu button -->
						<DisclosureButton
							class="ml-6 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span class="sr-only">Open main menu</span>
							<TwIcon v-if="!open" name="menu" class="text-2xl" />
							<TwIcon v-else name="close" class="text-2xl" />
						</DisclosureButton>
					</div>
				</div>
			</div>
		</div>

		<DisclosurePanel
			v-slot="{ close }"
			class="disclosure-panel sm:hidden fixed w-full border-b bg-white"
		>
			<div class="pt-2 pb-3 space-y-1 flex flex-col justify-end h-full">
				<RenderMenu
					v-for="menu in menus"
					:key="menu.id"
					:menu="menu"
					class=""
					@click="onClickMenu(menu, close)"
				/>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>

<script setup lang="ts">
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'

const config = useRuntimeConfig()

const { usePageStore, useUserStore, useSettingStore } = useStore()
const userStore = useUserStore()
const settingStore = useSettingStore()
const pageStore = usePageStore()
const homePage = pageStore.homepage

const { user, avatarImg } = storeToRefs(userStore)
const { logoBackgroundColor, projectLogoImg } = storeToRefs(settingStore)
const menus = settingStore.menus.filter((e) => e.parent === null)
const adminUrl = config.terminal.adminUrl

async function logout() {
	const directus = useDirectus()
	try {
		await directus.auth.logout()
	} catch (err) {
		// do nothing
	} finally {
		navigateTo('sign-in')
	}
}

function onClickMenu(menu, close) {
	if (menu.menu !== 'category') {
		close()
	}
}
</script>

<style scoped>
.background-logo {
	background-color: v-bind('logoBackgroundColor');
}
.disclosure-panel {
	height: calc(100% - 64px);
	bottom: 64px;
	z-index: 10000;
}
</style>
