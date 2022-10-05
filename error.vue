<template>
	<div>
		<Error404 v-if="error.statusCode == 404" />
		<ErrorDefault v-else />
	</div>
</template>

<script lang="ts" setup>
import Error404 from './components/error/404.vue'
import ErrorDefault from './components/error/default.vue'

const error = useError()
</script>
