<template>
	<div class="p-4">
		<img
			:class="`w-full shadow-${shadow}`"
			:style="styles"
			:src="url"
			@error="onError()"
		/>
	</div>
</template>

<script setup lang="ts">
import { ImageWidget } from '~~/shared/types'

interface Props {
	widget: ImageWidget
}

const props = defineProps<Props>()
const {
	objectFit,
	defaultImage,
	zoom,
	borderRadius,
	shadow,
	ratioWidth,
	ratioHeight,
} = props.widget as any
const styles = getStyles()
const url = ref(props.widget?.url)

// functions
function onError() {
	if (!defaultImage) return

	const { getFileSrc } = useUtils()
	url.value = getFileSrc(defaultImage)
}

function getStyles() {
	const styles = {
		'aspect-ratio':
			ratioWidth && ratioHeight ? `${ratioWidth}/${ratioHeight}` : 'auto',
		'object-fit': objectFit ?? 'contain',
		transform: zoom ? `scale(${zoom})` : null,
		'border-radius': borderRadius ?? null,
	}

	Object.keys(styles).forEach((k) => {
		if (
			styles[k] === null ||
			styles[k] === undefined ||
			String(styles[k]).trim() === ''
		) {
			delete styles[k]
		}
	})
	return styles
}
</script>
