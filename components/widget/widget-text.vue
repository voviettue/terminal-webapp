<template>
	<p :style="styles">{{ text }}</p>
</template>

<script setup lang="ts">
import { TextWidget } from '~/shared/types'
import { applyConditions } from '@/utils/apply-conditions'

interface Props {
	widget: TextWidget
}

const props: any = defineProps<Props>()
const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const options = ref(props.widget.options)
const text = ref('')

const textRender = renderTemplate(props.widget?.text, {
	...pageStore.context,
	...props.widget?.context,
})

if (props.widget?.condition) {
	const { widget, text: value } = applyConditions(props.widget, textRender)
	text.value = value
	options.value = widget.options
}

const styles = getStyles(options.value)
</script>
