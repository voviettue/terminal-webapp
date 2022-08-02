<template>
	<component :is="`menu-${menu.menu}`" :menu="menuType"></component>
</template>

<script setup lang="ts">
import { Menu } from '~/shared/types'

interface Props {
	menu: Menu
}

const props = defineProps<Props>()

const menuType = { ...props.menu, ...props.menu.options }
</script>
