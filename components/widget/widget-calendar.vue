<template>
	<div :class="`calendar calendar-${calendarScreens}`">
		<div
			class="toolbar flex flex-none items-center justify-between border-x border-t border-gray-300 bg-gray-100 py-4 px-6"
		>
			<h1 class="text-lg font-semibold text-gray-900">
				{{ title }}
			</h1>
			<div class="flex">
				<div class="flex items-center rounded-md shadow-sm md:items-stretch">
					<button
						class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
						@click="action('prev')"
					>
						<TwIcon
							name="keyboard_arrow_left"
							class="icon text-xl"
							aria-hidden="true"
						></TwIcon>
					</button>
					<button
						v-if="calendarScreens !== 'tablet' && calendarScreens !== 'mobile'"
						class="border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative"
						@click="action('today')"
					>
						Today
					</button>
					<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
					<button
						class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
						@click="action('next')"
					>
						<TwIcon
							name="keyboard_arrow_right"
							class="icon text-xl"
							aria-hidden="true"
						></TwIcon>
					</button>
				</div>
				<div
					v-if="calendarScreens !== 'tablet' && calendarScreens !== 'mobile'"
					class="select-view md:ml-4 md:ml-4 md:flex md:items-center"
				>
					<FormKit
						v-model="view"
						type="select"
						name="calendarView"
						:options="[
							{ label: 'Month view', value: 'dayGridMonth' },
							{ label: 'Week view', value: 'timeGridWeek' },
							{ label: 'Day view', value: 'timeGridDay' },
						]"
					/>
				</div>
				<Menu
					v-if="calendarScreens === 'tablet' || calendarScreens === 'mobile'"
					as="div"
					class="relative ml-6"
				>
					<MenuButton
						class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
					>
						<span class="sr-only">Open menu</span>
						<TwIcon
							name="more_vert"
							class="icon text-xl h-5 w-5"
							aria-hidden="true"
						></TwIcon>
					</MenuButton>

					<transition
						enter-active-class="transition ease-out duration-100"
						enter-from-class="transform opacity-0 scale-95"
						enter-to-class="transform opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75"
						leave-from-class="transform opacity-100 scale-100"
						leave-to-class="transform opacity-0 scale-95"
					>
						<MenuItems
							class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div class="py-1">
								<MenuItem v-slot="{ active }">
									<a
										href="#"
										:class="[
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm',
										]"
										@click.prevent="action('today')"
									>
										Go to today
									</a>
								</MenuItem>
							</div>
							<div class="py-1">
								<MenuItem v-slot="{ active }">
									<a
										href="#"
										:class="[
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm',
										]"
										@click.prevent="action('changeView', 'dayGridMonth')"
									>
										Month view
									</a>
								</MenuItem>
								<MenuItem v-slot="{ active }">
									<a
										href="#"
										:class="[
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm',
										]"
										@click.prevent="action('changeView', 'timeGridWeek')"
									>
										Week view
									</a>
								</MenuItem>
								<MenuItem v-slot="{ active }">
									<a
										:class="[
											active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
											'block px-4 py-2 text-sm',
										]"
										@click.prevent="action('changeView', 'timeGridDay')"
									>
										Day view
									</a>
								</MenuItem>
							</div>
						</MenuItems>
					</transition>
				</Menu>
			</div>
		</div>
		<FullCalendar
			ref="calendar"
			:class="`shadow-${widget?.shadow} calendar-rounded`"
			:options="calendarOptions"
		>
			<template #eventContent="context">
				<span v-tooltip="{ content: context.event.title, allowHTML: true }">
					<strong>{{ getTime(context) }}</strong>
					<span class="ml-1" v-html="context.event.title"></span>
				</span>
			</template>
		</FullCalendar>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import '@fullcalendar/core/vdom' // solve problem with Vite
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import format from 'date-fns/format'
import startOfDay from 'date-fns/startOfDay'
import { calendarEventParse } from '../../utils/calendar-event-parse'
import { CalendarWidget } from '~/shared/types'

interface Props {
	widget: CalendarWidget
}

const props: any = defineProps<Props>()
const calendar = ref(null)
const title: Ref<string> = ref('')
const view: Ref<string> = ref('')
const calendarScreens: Ref<string> = ref('')

const { parseJson } = useUtils()
const { usePageStore } = useStore()
const pageStore = usePageStore()
const borderRadius = ref('')
const events = ref([])
const calendarOptions = ref({
	plugins: [
		dayGridPlugin,
		timeGridPlugin,
		interactionPlugin, // needed for dateClick
	],
	headerToolbar: null,
	initialView: props.widget?.defaultView || 'dayGridMonth',
	events: events.value,
	editable: true,
	selectable: true,
	selectMirror: true,
	dayMaxEvents: true,
	weekends: true,
	themeSystem: 'bootstrap5',
	contentHeight: null,
	firstDay: props.widget?.firstDay || 0,
	select: onDateClick,
	eventClick: onItemClick,
})

const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)

const calendarApi = computed(() => {
	return calendar.value?.getApi()
})

watch(view, (val) => {
	if (val) action('changeView', val)
})

watch(calendarScreens, (val) => {
	calendarOptions.value.contentHeight = val === 'mobile' ? 350 : null
})

watch(
	rawData,
	() => {
		const data = parseJson(rawData.value, [])
		if (!Array.isArray(data)) return

		events.value = data
			.map((item) => calendarEventParse(item, props.widget?.options))
			.filter((e) => e)

		calendarOptions.value = { ...calendarOptions.value, events: events.value }
	},
	{ immediate: true }
)

function getTitle() {
	title.value = calendar.value?.calendar?.view?.title
}

function action(actionName: string, params = null) {
	if (!calendarApi.value) return

	calendarApi.value[actionName](params)
	getTitle()
}

function onItemClick(item) {
	if (!props.widget?.onItemClick) return
	const context = { ...pageStore.context, $item: item.event }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onItemClick)
	fn(...Object.values(context))
}

function onDateClick(item) {
	if (!props.widget?.onDateClick) return
	const context = { ...pageStore.context, $item: item.event }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onDateClick)
	fn(...Object.values(context))
}

function getTime(context: any) {
	if (!context.timeText) return null

	if (!context?.isStart) {
		return format(startOfDay(new Date(context.event.end)), 'haaa')
	}

	const date = new Date(context.event.start)
	const formatTyle = date.getMinutes() === 0 ? 'haaa' : 'h:maaa'

	return format(new Date(context.event.start), formatTyle)
}

function _resizeHandler() {
	setCalendarScreens(calendar.value?.$el.offsetWidth)
}

function setCalendarScreens(width) {
	switch (true) {
		case width >= 1280:
			calendarScreens.value = 'desktop'
			break
		case width >= 1024 && width < 1280:
			calendarScreens.value = 'laptop'
			break
		case width >= 640 && width < 1024:
			calendarScreens.value = 'tablet'
			break
		case width < 640:
			calendarScreens.value = 'mobile'
			break
	}
}

onMounted(() => {
	borderRadius.value = (props.widget?.borderRadius || 0) + 'px'
	view.value = props.widget?.defaultView
	getTitle()
	setCalendarScreens(calendar.value?.$el.offsetWidth)

	window.addEventListener('resize', _resizeHandler)
})

onUpdated(() => {
	calendarOptions.value.contentHeight =
		calendarScreens.value === 'mobile' ? 350 : null
})

onUnmounted(() => {
	window.removeEventListener('resize', _resizeHandler)
})
</script>

<style scoped lang="scss">
.fc {
	--fc-today-bg-color: #fff;
	--fc-event-bg-color: #6366f1;
	--fc-event-border-color: black;
}

.toolbar {
	border-top-left-radius: v-bind(borderRadius);
	border-top-right-radius: v-bind(borderRadius);
}

@import '@/assets/css/component/calendar.scss';
</style>
