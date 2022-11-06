<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<textarea
		:id="id"
		v-model="value"
		v-tooltip="tooltip"
		:style="attrs?.style"
		:rows="rows"
		:placeholder="placeholder"
		:autocomplete="autocompleted"
		:disabled="disabled"
		:name="name"
		:readonly="readonly"
		:class="textareaClass"
		:autofocus="autofocus"
		@blur="emit('blur', $event)"
		@focus="emit('focus', $event)"
	></textarea>
	<span v-if="showWorkLimit" class="work-limit">{{ workLength }}</span>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		id?: string
		modelValue?: string
		placeholder?: string
		rows?: number
		autocompleted?: string
		name?: string
		readonly?: boolean
		disabled?: boolean
		showWorkLimit?: boolean
		tooltip?: string
		autofocus?: boolean
	}>(),
	{
		id: undefined,
		modelValue: '',
		placeholder: '',
		autocompleted: 'off',
		name: '',
		readonly: false,
		disabled: false,
		rows: 3,
		showWorkLimit: false,
		tooltip: '',
		autofocus: false,
	}
)
const value = computed({
	get: () => {
		return props.modelValue
	},
	set: (newValue) => {
		emit('update:modelValue', newValue)
		emit('change', newValue)
	},
})
const workLength = computed(() => {
	return value.value?.length
})

const emit = defineEmits(['update:modelValue', 'blur', 'change', 'focus'])
const attrs = useAttrs()
const textareaClass = [
	props.readonly ? 'bg-slate-200 ' : '',
	'w-full',
	'px-4',
	'py-2',
	'border',
	'border-gray-300',
	'relative',
	attrs?.class,
]
</script>
<style lang="scss" scoped>
.work-limit {
	position: absolute;
	top: calc(50% - 14px);
	right: 20px;
}
</style>
