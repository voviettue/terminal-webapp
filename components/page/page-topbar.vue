<template>
	<Disclosure
		v-slot="{ open }"
		as="nav"
		class="bg-white shadow fixed bottom-0 w-full sm:relative z-50 px-6"
	>
		<div class="container mx-auto bg-white border-t">
			<div class="flex h-16">
				<div
					class="flex-shrink-0 flex items-center justify-center background-logo"
				>
					<NuxtLink :to="homePage?.endpoint ?? '/homepage'">
						<img class="h-9 w-auto" :src="projectLogoImg" alt="Project Logo" />
					</NuxtLink>
				</div>
				<div :class="{ 'flex grow mx-8': true, ...navClass }">
					<nav class="hidden sm:flex sm:space-x-8">
						<!-- Current: 'border-indigo-500 text-gray-900', Default: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700' -->
						<RenderMenu
							v-for="menu in menus"
							:key="menu.id"
							:class="`${hideLabel ? 'menu menu-icon' : ''}`"
							:menu="menu"
						/>
					</nav>
				</div>
				<div class="flex-shrink-0 flex items-center">
					<!-- Profile dropdown -->
					<Menu as="div" class="relative">
						<div>
							<MenuButton
								class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<span class="sr-only">Open user menu</span>
								<img
									v-if="avatarImg"
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
								class="origin-top-right absolute right-0 -mt-[90px] sm:mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<MenuItem v-slot="{ active }" as="div">
									<NuxtLink
										to="/user/profile"
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
			class="disclosure-panel sm:hidden fixed flex flex-col justify-end w-full border-b bg-white"
		>
			<nav class="pt-2 pb-3 space-y-1 flex flex-col justify-end bg-white">
				<RenderMenu
					v-for="menu in menus"
					:key="menu.id"
					:menu="menu"
					:hide-label="hideLabel"
					@click="onClickMenu(menu, close)"
				/>
			</nav>
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

const router = useRouter()
const { usePageStore, useUserStore, useSettingStore } = useStore()
const userStore = useUserStore()
const settingStore = useSettingStore()
const pageStore = usePageStore()
const homePage = pageStore.homepage

const { user, avatarImg } = storeToRefs(userStore)
const { logoBackgroundColor, projectLogoImg } = storeToRefs(settingStore)
const menus = settingStore.menus.filter((e) => e.parent === null)
let closePanel = () => null

router.afterEach(() => {
	closePanel()
})

const options = settingStore.settings?.menu_options
const alignment = options?.alignment || 'left'
const hideLabel = options?.hideLabel || false
const fontFamily = options?.fontFamily || 'inherit'
const navClass = {
	'justify-start': alignment === 'left',
	'justify-center': alignment === 'center',
	'justify-end': alignment === 'right',
}
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
	closePanel = close
	const state = useMenu()
	if (menu.menu !== 'category') {
		close()
		state.value.open = false
	}
}
</script>

<style scoped lang="scss">
.background-logo {
	background-color: v-bind('logoBackgroundColor');
}

.disclosure-panel {
	height: calc(100% - 64px);
	left: 0;
	width: 100%;
	bottom: 64px;
	z-index: 10000;
}
</style>

<style lang="scss">
nav {
	position: relative;
	z-index: 500;
	.menu {
		font-family: v-bind('fontFamily');
		@apply px-4 py-2 sm:py-0 sm:px-0 border-l-4 sm:border-l-0 border-transparent sm:border-b-2 flex justify-start items-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 hover:sm:bg-inherit relative;

		&.active {
			@apply text-indigo-500 bg-indigo-50 border-indigo-500 font-medium sm:bg-inherit;
		}

		&.sub {
			@apply py-2 w-full sm:p-4 sm:py-2 border-b-0;
		}

		&.sub.active {
			@apply border-l-4 sm:border-b-0;
		}
	}

	.tooltip {
		@apply invisible absolute;
		@apply py-1 px-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity dark:bg-gray-700;
		left: 0;
		bottom: -40px;
	}
	.menu-icon {
		.icon {
			font-size: 1.5rem;
			padding: 0.75rem;
		}
		.label {
			@apply inline sm:hidden;
		}
		&:hover .tooltip {
			@apply visible z-50 opacity-100;
		}
		&:focus .tooltip {
			@apply invisible;
		}
		.sub .icon {
			font-size: 1.25rem;
			padding: 0;
		}
		.sub .label {
			@apply sm:inline;
		}
		.sub .tooltip {
			display: none !important;
		}
	}
}
</style>
