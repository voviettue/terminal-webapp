<template>
	<div :class="divClass">
		<Menu v-tooltip="tooltip" as="div" class="relative inline-block text-left">
			<div>
				<MenuButton
					:class="buttonClass"
					:style="styles"
				>
					<div v-if="leftIcon" class="pr-2 text-xl flex items-center">
						<TwIcon :name="leftIcon" class="pr-2 h-max opacity-70"></TwIcon>
					</div>
					<template v-if="text">
						{{ text }}
					</template>
					<template v-else>
						<div class="text-xl flex items-center">
							<TwIcon name="menu" class="h-max opacity-70"></TwIcon>
						</div>
					</template>
					<div v-if="rightIcon" class="pl-2 text-xl flex items-center">
						<TwIcon :name="rightIcon" class="pl-2 h-max opacity-70"></TwIcon>
					</div>
				</MenuButton>
			</div>

			<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
				<MenuItems
					:class="`absolute right-0 z-20 mt-2 w-56 origin-top-right bg-white shadow-${shadow} focus:outline-none`"
					:style="styles"
				>
					<MenuItem
						v-for="(item, index) in buttonItems"
						:key="`menu-item-${index}`"
						v-slot="{ active }"
						:disabled="item.disabled"
					>
						<button
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'flex text-left px-4 py-2 text-sm w-full',
								item.divider ? 'border-b border-b-gray-100' : ''
							]"
							:style="styles"
							@click="onButtonClick(item.onClick)"
						>
							<div v-if="item.icon" class="pr-2 text-xl flex items-center">
								<TwIcon :name="item.icon" class="pr-2 h-max opacity-70"></TwIcon>
							</div>
							{{ item.label }}
						</button>
					</MenuItem>
				</MenuItems>
			</transition>
		</Menu>
	</div>
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
	buttonVariant = 'primary',
	position = 'center',
	buttonSize = 'md',
	shadow = 'sm',
	disabled,
	buttonType = 'solid',
	tooltip,
	menuItems,
} = (props.widget?.options || {}) as Partial<MenuButtonWidget>

const { getStyles } = useUtils()
const styles = getStyles(props.widget?.options)

const { result: text } = useBindData(label, props.widget?.context)

const getTypeButton = () => {
	const text = buttonVariant
	if (buttonType === 'solid') return text
	return `${text}-${buttonType}`
}
const buttonClass = [
	'btn',
	`${buttonSize}`,
	`${getTypeButton()}`,
	disabled ? 'disabled' : '',
	!text.value ? 'icon' : '',
	position,
	`shadow-${shadow}`
]
const divClass = [
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
