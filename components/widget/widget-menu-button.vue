<template>
	<Menu as="div" class="relative inline-block text-left">
		<div>
			<MenuButton>
				<FormField>
					<div :class="buttonClass">
						<FormKit
							type="customButton"
							:disabled="disabled"
							:left-icon="leftIcon"
							:right-icon="rightIcon"
							:variant="buttonVariant"
							:size="buttonSize"
							:style="{
								borderRadius: borderRadius || '0px',
							}"
							:class="[`shadow-${shadow || null}`]"
							:button-type="buttonType"
							@click="onButtonClick"
						>
							{{ text }}
						</FormKit>
					</div>
				</FormField>
			</MenuButton>
		</div>

		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<MenuItems
				class="absolute right-0 z-20 mt-2 origin-top-right divide-y divide-gray-100 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<MenuItem
					v-for="(item, index) in buttonItems"
					:key="`menu-item-${index}`"
					v-slot="{ active }"
					:class="['btn md !justify-start', item.disabled ? 'disabled' : '']"
					@click="onButtonClick(item.onClick)"
				>
					<a
						href="#"
						:class="[
							active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
							'gap-x-2',
						]"
					>
						<div v-if="item.icon" class="text-xl flex items-center">
							<TwIcon :name="item.icon" class="h-max opacity-70"></TwIcon>
						</div>
						{{ item.label }}
					</a>
				</MenuItem>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MenuButtonWidget } from '~~/shared/types'

interface Props {
	widget: MenuButtonWidget
}
const props: any = defineProps<Props>()
const { usePageStore } = useStore()
const pageStore = usePageStore()

const {
	rightIcon,
	leftIcon,
	label,
	buttonVariant,
	position,
	buttonSize,
	shadow,
	borderRadius,
	disabled,
	buttonType,
	menuItems,
} = (props.widget?.options || {}) as Partial<MenuButtonWidget>

const { result: text } = useBindData(label, props.widget?.context)

const getTypeButton = () => {
	const text = buttonVariant
	if (buttonType === 'solid') return text
	return `${text}-${buttonType}`
}

const buttonClass = [
	'btn',
	`${buttonSize}`,
	`${getTypeButton() ?? 'primary'}`,
	disabled ? 'disabled' : '',
	'w-full',
	'flex',
	position === 'left'
		? 'justify-start'
		: position === 'right'
		? 'justify-end'
		: 'justify-center',
]

const buttonItems = computed(() => {
	return menuItems.filter((item: any) => !item.hidden)
})

function onButtonClick(onClick: any) {
	if (!onClick) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), onClick)
	fn(...Object.values(context))
}
</script>
