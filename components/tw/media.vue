<template>
	<TwCard class="pt-4">
		<div class="flex justify-start">
			<div
				v-if="icon"
				class="w-9 h-9 rounded-full bg-gray-300 flex justify-center items-center mr-4"
			>
				<img :src="`../../../assets/icons/${icon}.svg`" alt="" />
			</div>
			<div class="text-sm">
				<slot name="description"></slot>
			</div>
		</div>
	</TwCard>
</template>
<script setup lang="ts">
type PropType = {
	icon: string
}
withDefaults(defineProps<PropType>(), {
	icon: '',
})
</script>
