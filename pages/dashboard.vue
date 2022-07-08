<template>
<div>
	<PageTopbar></PageTopbar>
	<div class="p-6 pt-8">
		<div class="mb-8">
			<PageHeading></PageHeading>
		</div>
		<div class="grid grid-cols-3 gap-6 mb-8">
			<div>
				<TwCardList></TwCardList>
			</div>
			<div class="col-span-2">
				<TwCardList></TwCardList>
			</div>
		</div>
		<div class="mb-8">
			<TwCardTable></TwCardTable>
		</div>
	</div>
</div>
</template>

<script setup>
definePageMeta({
	middleware: ['auth'],
})
</script>
