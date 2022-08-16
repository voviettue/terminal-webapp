<template>
	<span class="tw-icon">
		<i :class="{ filled }" :data-icon="name"></i>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	props: {
		name: {
			type: String,
			required: true,
		},
		filled: {
			type: Boolean,
			required: false,
		},
	},
})
</script>

<style scoped>
.tw-icon {
	position: relative;
	display: inline-block;
	min-width: 12px;
	min-height: 12px;
	vertical-align: middle;
}
.tw-icon i {
	display: block;
	font-weight: normal;
	font-size: inherit;
	font-family: 'Material Icons Outline';
	font-style: normal;
	line-height: 1;
	letter-spacing: normal;
	white-space: nowrap;
	text-transform: none;
	word-wrap: normal;
	font-feature-settings: 'liga';
}

.tw-icon i::after {
	content: attr(data-icon);
}

.tw-icon i.filled {
	font-family: 'Material Icons';
}
</style>
