<!-- eslint-disable vue/no-v-html -->
<template>
	<div :style="styles" class="richtext-wrapper" v-html="content"></div>
</template>
<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { RichTextWidget } from '~~/shared/types'
const { getFileSrc } = useUtils()
const regex = {
	img: /<img\s.*?src=(?:'|\")([^'\">]+)(?:'|\").*?\/?>/g,
	video: /<source\s.*?src=(?:'|\")([^'\">]+)(?:'|\").*?\/?>/g,
	src: /src=(?:'|\")([^'\">]+)(?:'|\").*?/,
}
interface Props {
	widget: RichTextWidget
}

const props: any = defineProps<Props>()
const { getStyles } = useUtils()

const styles = getStyles(props.widget.options)
const contents = ref(props.widget?.content)
const replaceMedia = () => {
	const imgs = (props.widget?.content || '').match(regex.img) || []
	const videos = (props.widget?.content || '').match(regex.video) || []
	imgs.forEach((item: string) => {
		const idx = item.indexOf('/assets/')
		const id = item.slice(idx + 8, idx + 44)
		const src = getFileSrc(id)
		const img = item.replace(regex.src, `src="${src}"`)
		contents.value = contents.value.replace(item, img)
	})
	videos.forEach((item: string) => {
		const idx = item.indexOf('/assets/')
		const id = item.slice(idx + 8, idx + 44)
		const src = getFileSrc(id)
		const img = item.replace(regex.src, `src="${src}"`)
		contents.value = contents.value.replace(item, img)
	})
}
replaceMedia()
const { result: content } = useBindData(contents.value, props.widget?.context)
</script>
<style lang="scss" scoped>
.richtext-wrapper {
	:deep() h4 {
		@apply text-base font-bold;
	}
	:deep() h5 {
		@apply text-sm font-bold;
	}
	:deep() h6 {
		@apply text-xs font-bold;
	}
	:deep()ul {
		@apply list-disc;
	}
	:deep() ol {
		@apply list-decimal;
	}
}
</style>
