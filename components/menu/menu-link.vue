<template>
	<NuxtLink
		:class="`border-transparent text-gray-500 inline-flex items-center px-1 pt-1 text-sm`"
		:to="menu.url"
	>
		{{ menu.label }}
	</NuxtLink>
</template>

<script setup lang="ts">
import { MenuLink } from '~/shared/types'

interface Props {
	menu: MenuLink
}

defineProps<Props>()
</script>
