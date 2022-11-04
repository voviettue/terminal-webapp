<template>
	<FormKit :id="widget.key" v-model="values" type="form" :actions="false">
		<div
			:class="`lg:grid lg:grid-cols-6 lg:gap-6 lg:space-y-0 space-y-6 mx-auto content-start shadow-${shadow}`"
			:style="styles"
		>
			<RenderWidget
				v-for="item in items"
				:key="`widget-${item.id}`"
				:widget="addContext(item, widget?.context)"
			/>

			<div v-if="!hideReset || !hideSubmit" class="width-full flex justify-end">
				<div class="flex space-x-6">
					<TwButton
						v-if="!hideReset"
						:variant="resetVariant"
						:type="resetType"
						:style="resetStyles"
						:class="{ [`shadow-${resetShadow}`]: !!resetShadow }"
						@click="onResetHandler"
					>
						{{ resetLabel }}
					</TwButton>
					<TwButton
						v-if="!hideSubmit"
						:variant="submitVariant"
						:style="submitStyles"
						:class="{ [`shadow-${submitShadow}`]: !!submitShadow }"
						:type="submitType"
						@click="onSubmitHandler"
					>
						{{ submitLabel }}
					</TwButton>
				</div>
			</div>
		</div>
	</FormKit>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Widget, ContainerWidget } from '~~/shared/types'

interface Props {
	widget: ContainerWidget
}

const props = defineProps<Props>()
const { getStyles, parseJson } = useUtils()
const { cloneDeep } = useLodash()
const { executeAction } = useContext()

const widgets: Widget[] = inject('widgets')
const values = ref({})

const options = props.widget.options
const {
	shadow,
	defaultValue,
	hideReset = false,
	resetLabel = 'Reset',
	resetType = 'solid',
	resetVariant = 'secondary',
	resetBorderRadius,
	resetShadow,
	onReset,
	hideSubmit = false,
	submitLabel = 'Submit',
	submitType,
	submitVariant,
	submitBorderRadius,
	submitShadow,
	onSubmit,
} = options
const { result: rawValue } = useBindData(defaultValue, props.widget?.context)

const initialValues = parseJson(rawValue.value, {})

watchEffect(() => {
	values.value = parseJson(rawValue.value, {})
})

const items = widgets.filter((e) => e.parent === props.widget.id)
const styles = getStyles(options)
const resetStyles = getStyles({
	borderRadius: resetBorderRadius,
	shadow: resetShadow,
})
const submitStyles = getStyles({
	borderRadius: submitBorderRadius,
	shadow: submitShadow,
})

async function onResetHandler() {
	if (onReset) {
		await executeAction(onReset, {
			$value: values.value,
			...props.widget.options?.context,
		})
	}

	values.value = cloneDeep(initialValues)
}

async function onSubmitHandler() {
	if (onSubmit) {
		await executeAction(onSubmit, {
			$value: values.value,
			...props.widget.options?.context,
		})
	}
}

function addContext(childWidget: Widget, context: any) {
	return { ...childWidget, context }
}
</script>
