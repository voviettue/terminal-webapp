<template>
	<section
		:data-id="id"
		:class="`widget width-${widget.width} ${widget?.html_class ?? ''}`"
	>
		<component :is="`widget-${widget.widget}`" :widget="detailsWidget" />
	</section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Widget } from '~/shared/types'

interface Props {
	widget: Widget
}

const props: any = defineProps<Props>()
const detailsWidget = { ...props.widget, ...props.widget.options }
const customCss = props.widget.custom_css
const id = (Math.random() + 1).toString(36).substring(7)

onMounted(() => {
	addCustomCss()
})

function addCustomCss() {
	if (!customCss) return

	const head = document.head
	const style = document.createElement('style') as HTMLStyleElement
	style.type = 'text/css'
	const regex = /(^\S+)(.*{)/
	const lines = customCss.split('\n')
	const css = lines
		.map((line) => {
			line = line.replace(regex, `$1[data-id="${id}"]$2`)
			return line
		})
		.join('\n')
	style.appendChild(document.createTextNode(css))
	head.append(style)
}
</script>
