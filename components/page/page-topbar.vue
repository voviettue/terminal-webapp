<template>
	<Disclosure v-slot="{ open }" as="nav" class="bg-white shadow">
		<div class="mx-auto px-8">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex items-center sm:hidden">
						<!-- Mobile menu button -->
						<DisclosureButton
							class="mr-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span class="sr-only">Open main menu</span>
							<nuxt-icon v-if="!open" class="h-6 w-6" name="menu" />
							<nuxt-icon v-else class="h-6 w-6" name="OutlineX" />
						</DisclosureButton>
					</div>
					<div class="flex-shrink-0 flex items-center">
						<img class="h-8 w-auto" :src="projectLogoImg" alt="Project Logo" />
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<!-- Current: 'border-indigo-500 text-gray-900', Default: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' -->
						<NuxtLink
							to="/dashboard"
							:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm ${
								route.name === 'dashboard'
									? 'border-indigo-500 border-b-2 font-medium'
									: ''
							}`"
						>
							Dashboard
						</NuxtLink>
						<NuxtLink
							to="/songs"
							:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm ${
								route.name.startsWith('songs')
									? 'border-indigo-500 border-b-2 font-medium'
									: ''
							}`"
						>
							Song
						</NuxtLink>
						<NuxtLink
							to="/acquisitions"
							:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm ${
								route.name.startsWith('acquisitions')
									? 'border-indigo-500 border-b-2 font-medium'
									: ''
							}`"
						>
							Acquisitions
						</NuxtLink>
					</div>
				</div>
				<div class="flex items-center">
					<!-- Profile dropdown -->
					<Menu as="div" class="relative">
						<div>
							<MenuButton
								class="text-transparent bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<span class="sr-only">Open user menu</span>
								<img
									v-if="avatarImg"
									class="h-8 w-8 rounded-full"
									:src="avatarImg"
									:alt="user?.avatar?.title || 'User Avatar'"
								/>
								<nuxt-icon
									v-else
									name="user-circle"
									class="avatar-icon h-8 w-8 rounded-full"
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
								class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<MenuItem v-slot="{ active }" as="div">
									<!-- <a
										href="#"
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700',
										]"
									>
										Your Profile
									</a> -->
									<NuxtLink
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700',
										]"
									>
										Your Profile
									</NuxtLink>
								</MenuItem>
								<MenuItem v-slot="{ active }" as="div">
									<a
										:class="[
											active ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700',
										]"
										@click="logout()"
									>
										Sign out
									</a>
								</MenuItem>
							</MenuItems>
						</transition>
					</Menu>
				</div>
			</div>
		</div>

		<DisclosurePanel class="sm:hidden">
			<div class="pt-2 pb-3 space-y-1">
				<!-- Current: 'bg-indigo-50 border-indigo-500 text-indigo-700', Default: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700' -->
				<DisclosureButton
					as="a"
					href="#"
					class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					Dashboard
				</DisclosureButton>
				<DisclosureButton
					as="a"
					href="#"
					class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					Team
				</DisclosureButton>
				<DisclosureButton
					as="a"
					href="#"
					class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					Projects
				</DisclosureButton>
				<DisclosureButton
					as="a"
					href="#"
					class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					Calendar
				</DisclosureButton>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>

<script setup>
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

const route = useRoute()
const { useUserStore, useSettingStore } = useStore()
const userStore = useUserStore()
const settingStore = useSettingStore()
const { user, avatarImg } = storeToRefs(userStore)
const { projectLogoImg } = storeToRefs(settingStore)

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
</script>

<style scoped>
.avatar-icon::v-deep(path) {
	stroke: #a0aec0;
}
</style>
