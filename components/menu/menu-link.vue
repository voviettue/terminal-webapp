<template>
	<NuxtLink
		:class="`p-4 py-2 border-transparent border-l-4 flex items-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 hover:sm:bg-inherit sm:border-l-0  sm:p-0`"
		:to="menu.url"
	>
		<TwIcon
			v-if="menu.icon"
			:name="menu.icon"
			class="text-green text-xl mr-2"
		></TwIcon>
		<span>
			{{ menu.label }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
import { MenuLink } from '~/shared/types'

interface Props {
	menu: MenuLink
}

defineProps<Props>()
</script>
