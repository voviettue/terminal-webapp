<template>
	<div :style="styles">
		<template v-for="(value, key, index) in widget.data">
			<div
				v-if="!widget?.rows || (index || 0) < widget.rows"
				:key="index"
				:class="`sm:grid sm:grid-cols-2`"
			>
				<p :style="leftStyle">{{ key }}</p>
				<p :style="rightStyle">{{ value }}</p>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { KeyValueWidget } from '~/shared/types'

interface Props {
	widget: KeyValueWidget
}

const props: any = defineProps<Props>()

const { getStyles } = useUtils()
const styles = getStyles(props.widget.options)
const leftStyle = getStylesBy('Left')
const rightStyle = getStylesBy('Right')

function getStylesBy(position: string) {
	const styles = {}
	const options = props.widget.options

	Object.keys(options).forEach((k) => {
		if (k.includes(position)) {
			const key = k.replace(position, '')
			styles[key] = options[k]
		}
	})

	return getStyles(styles)
}
</script>
