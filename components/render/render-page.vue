<template>
	<div>
		<p>list witget page {{ page?.name }} in comming</p>
		<p>params</p>
		<ul>
			<li v-for="(value, key) in params" :key="key">{{ key }}: {{ value }}</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { Page } from '~/shared/types'

interface Props {
	params: object | null
	page?: Page
}

defineProps<Props>()
</script>
