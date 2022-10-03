<template>
	<img
		:class="`w-full shadow-${shadow}`"
		:style="styles"
		:src="url"
		@error="onError()"
	/>
</template>

<script setup lang="ts">
import { ImageWidget } from '~~/shared/types'

interface Props {
	widget: ImageWidget
}

const props = defineProps<Props>()
const { defaultImage, shadow } = props.widget as any
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
const { result: url } = useBindData(props.widget?.url, props.widget?.context)
if (!url.value) {
	onError()
}

// functions
function onError() {
	if (!defaultImage) {
		url.value = 'img/default-img.png'
		return
	}

	const { getFileSrc } = useUtils()
	url.value = getFileSrc(defaultImage)
}
</script>
