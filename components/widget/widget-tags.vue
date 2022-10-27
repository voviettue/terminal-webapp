<template>
	<div :class="`flex gap-2 ${allowWrap ? 'flex-wrap' : 'flex-nowrap'}`">
		<span
			v-for="item in items"
			:key="`text-${item.value}`"
			class="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-sm font-medium text-gray-800"
			:style="{ ...styles, ...item.style }"
		>
			{{ item.text }}
		</span>
	</div>
</template>

<script setup lang="ts">
import { TagsWidget } from '~/shared/types'
import { matchCondition } from '@/utils/apply-conditions'

interface Props {
	widget: TagsWidget
}

const props: any = defineProps<Props>()
const { getStyles, parseJson } = useUtils()

const options = ref(props.widget.options)
const styles = ref(getStyles(options.value))
const { delimiter, allowWrap, conditions } = options.value

const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)

const values = computed(() => {
	const parsedValue = parseJson(rawData.value)
	const regex = new RegExp(`[${delimiter ?? ','}]`, 'g')
	return Array.isArray(parsedValue) ? parsedValue : parsedValue.split(regex)
})

const items = values.value
	.map((value) => {
		if (typeof value === 'object') value = JSON.stringify(value)

		const item = (conditions || []).find((condition: any) => {
			return matchCondition(
				{ operator: condition.operator, value: condition.value },
				value
			)
		})

		return {
			value,
			text: item?.text || value,
			style: getStyles(item),
		}
	})
	.filter((e) => !!e.value)
</script>
