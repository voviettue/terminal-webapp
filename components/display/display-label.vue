<template>
	<div class="inline-flex gap-2">
		<template v-if="showAsDot">
			<span
				v-for="item in items"
				:key="`dot-${item.value}`"
				class="bg-green-400 inline-block h-3 w-3 flex-shrink-0 rounded-full"
				:style="{ background: item.background ?? '#000000' }"
			/>
			<br />
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
import { matchCondition } from '~~/utils/apply-conditions'

interface Props {
	value: any
	options?: any
}
const props = defineProps<Props>()

const { showAsDot, format, choices } = props.options
const values = Array.isArray(props.value) ? props.value : [props.value]

const items = values
	.map((value) => {
		if (typeof value === 'object') value = JSON.stringify(value)
		if (typeof value !== 'string') value = ''

		const choice = (choices || []).find((choice: any) => {
			return matchCondition({ operator: 'eq', value: choice.value }, value)
		})

		const text = format ? formatTitle(value) : value
		return {
			value,
			text: choice?.text || text,
			foreground: choice?.foreground,
			background: choice?.background,
		}
	})
	.filter((e) => !!e.value)
</script>
