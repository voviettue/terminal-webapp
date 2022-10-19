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
const { defaultImg, shadow } = props.widget as any
const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
const { type, url, file } = options
const value = type === 'file' ? file : url

const { result: bindValue } = useBindData(value, props.widget?.context)
const defaultSrc = 'img/default-img.png'
const src = ref(getSrc())

watch(bindValue, () => {
	src.value = getSrc()
})

function getSrc() {
	const src = type === 'file' ? getFileSrc(bindValue.value) : bindValue.value
	if (!src) {
		return defaultImg ? getFileSrc(defaultImg) : defaultSrc
	}
	return src
}

// functions
function onError() {
	src.value = defaultImg ? getFileSrc(defaultImg) : defaultSrc
}
</script>
