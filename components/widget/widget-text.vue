<template>
	<p :style="styles">{{ text || '—' }}</p>
</template>

<script setup lang="ts">
import { TextWidget } from '~/shared/types'
import { applyConditions } from '@/utils/apply-conditions'

interface Props {
	widget: TextWidget
}

const props: any = defineProps<Props>()
const { getStyles } = useUtils()

const options = ref(props.widget.options)
const styles = ref(getStyles(options.value))

const { result: rawData } = useBindData(
	props.widget.options?.text,
	props.widget?.context
)
const text = computed(() => {
	if (!props.widget?.condition) return rawData.value
	const { widget, text } = applyConditions(props.widget, rawData.value)
	styles.value = getStyles(widget.options)
	return text
})
</script>
