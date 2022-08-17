<template>
	<component
		:is="`menu-${menu.menu}`"
		:menu="menuType"
		:nested="nested"
	></component>
</template>

<script setup lang="ts">
import { Menu } from '~/shared/types'

interface Props {
	menu: Menu
	nested: boolean
}

const props = withDefaults(defineProps<Props>(), { nested: false })

const menuType = { ...props.menu, ...props.menu.options }
</script>
