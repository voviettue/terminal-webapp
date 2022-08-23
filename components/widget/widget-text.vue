<template>
	<p :style="styles">{{ widget.text }}</p>
</template>

<script setup lang="ts">
import { TextWidget } from '~~/shared/types'

interface Props {
	widget: TextWidget
}

const props: any = defineProps<Props>()
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
</script>
