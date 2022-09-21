<template>
	<a
		:href="link"
		:target="newTab !== false ? '_blank' : '_top'"
		class="w-full"
		:style="styles"
	>
		<div class="tooltip">
			{{ text }}
			<span v-if="tooltip" class="tooltiptext">{{ tooltip }}</span>
		</div>
	</a>
</template>

<script setup lang="ts">
import { LinkWidget } from '~~/shared/types'

interface Props {
	widget: LinkWidget
}

const props: any = defineProps<Props>()
const { newTab, tooltip } = (props.widget?.options || {}) as Partial<LinkWidget>
const { getStyles, renderTemplate } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const styles = getStyles(props.widget.options)

const url = renderTemplate(props.widget?.url, {
	...pageStore.context,
	...props.widget?.context,
})

function formatLink(url) {
	const regexlink = /^http(s)?:\/\/.+/i
	if (!regexlink.test(url)) return `http://${url}`
	return url
}
const link = formatLink(url)

const text = renderTemplate(props.widget?.text, {
	...pageStore.context,
	...props.widget?.context,
})
</script>
<style scoped>
.tooltip {
	position: relative;
	width: max-content;
	word-wrap: break-word;
	max-width: 100%;
}

.tooltip .tooltiptext {
	visibility: hidden;
	background-color: black;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 5px;
	position: absolute;
	z-index: 1;
	bottom: 125%;
	left: 50%;
	opacity: 0;
	transition: opacity 0.3s;
	font-size: 12px;
	font-style: normal;
	font-weight: 400;
	transform: translateX(-50%);
	width: max-content;
}

.tooltip .tooltiptext::after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
	visibility: visible;
	opacity: 1;
}
</style>
