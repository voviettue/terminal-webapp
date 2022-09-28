<template>
	<div class="grid justify-items-stretch">
		<div class="justify-self-end w-1/2">
			<FormKit
				type="text"
				:delay="1500"
				name="search"
				placeholder="Search..."
				@input="inputSearch"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:search'])

function inputSearch(value: any) {
	emit('update:search', value)
}
</script>

<style scoped></style>
