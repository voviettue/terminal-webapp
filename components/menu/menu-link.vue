<template>
	<NuxtLink :class="{ menu: true, sub: nested }" :to="menu.url">
		<TwIcon
			v-if="menu.icon"
			:name="menu.icon"
			class="shrink-0 text-green text-xl mr-2"
		></TwIcon>
		<span class="">
			{{ menu.label }}
		</span>
	</NuxtLink>
</template>

<script setup lang="ts">
import { MenuLink } from '~/shared/types'

interface Props {
	menu: MenuLink
	nested: boolean
}

defineProps<Props>()
</script>
