<template>
	<div class="inline-flex gap-2">
		<template v-if="showAsDot">
			<span
				v-for="item in items"
				:key="`dot-${item.value}`"
				class="bg-green-400 inline-block h-3 w-3 flex-shrink-0 rounded-full"
				:style="{ background: item.background }"
			/>
		</template>
		<template v-else>
			<span
				v-for="item in items"
				:key="`text-${item.value}`"
				class="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800"
				:style="{
					color: item.foreground,
					background: item.background,
				}"
			>
				{{ item.text }}
			</span>
		</template>
	</div>
</template>
<script setup lang="ts">
import { formatTitle } from '@directus/format-title'
import isEmpty from 'lodash/isEmpty'

interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()

const { showAsDot, format, choices, type = 'string' } = props.options

const items = computed(() => {
	let items: string[]

	if (isEmpty(props.value)) items = []
	else if (type === 'string') items = [props.value as string]
	else items = props.value as string[]

	return items.map((item) => {
		const choice = (choices || []).find((choice: any) => choice.value === item)

		let itemStringValue: string

		if (typeof item === 'object') {
			itemStringValue = JSON.stringify(item)
		} else {
			itemStringValue = format ? formatTitle(item) : item
		}

		if (choice === undefined) {
			return {
				value: item,
				text: itemStringValue,
			}
		} else {
			return {
				value: item,
				text: choice.text || itemStringValue,
				foreground: choice.foreground,
				background: choice.background,
			}
		}
	})
})
</script>
