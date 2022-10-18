<template>
	<img
		:class="`w-full shadow-${shadow}`"
		:style="styles"
		:src="src"
		@error="onError()"
	/>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import getFileSrc from '~~/composables/utils/get-file-src'
import { ImageWidget } from '~~/shared/types'

interface Props {
	widget: ImageWidget
}

const props = defineProps<Props>()
const options = props.widget.options
const { defaultImage, shadow } = props.widget as any
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
const { type, url, file } = options
const value = type === 'file' ? file : url
const src = ref(value)

const { result: bindValue } = useBindData(value, props.widget?.context)

watch(bindValue, () => {
	if (type === 'file') {
		src.value = getFileSrc(bindValue.value)
		return
	}
	src.value = url
})

// functions
function onError() {
	if (!defaultImage) {
		src.value = 'img/default-img.png'
		return
	}

	const { getFileSrc } = useUtils()
	src.value = getFileSrc(defaultImage)
}
</script>
