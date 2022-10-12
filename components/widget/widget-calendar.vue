<template>
	<FullCalendar
		:class="`shadow-${widget?.shadow} calendar-rounded`"
		:options="calendarOptions"
	></FullCalendar>
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { calendarEventParse } from '../../utils/calendar-event-parse'
import { CalendarWidget } from '~/shared/types'

interface Props {
	widget: CalendarWidget
}

const props: any = defineProps<Props>()

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
	headerToolbar: {
		left: 'title',
		center: 'prev,today,next',
		right: 'dayGridMonth,timeGridWeek,timeGridDay',
	},
	initialView: props.widget?.defaultView || 'dayGridMonth',
	events: events.value,
	editable: true,
	selectable: true,
	selectMirror: true,
	dayMaxEvents: true,
	weekends: true,
	themeSystem: 'bootstrap5',
	firstDay: props.widget?.firstDay || 0,
	select: onDateClick,
	eventClick: onItemClick,
})

const { result: rawData } = useBindData(
	props.widget?.data,
	props.widget?.context
)

watch(rawData, () => {
	const data = parseJson(rawData.value, [])
	if (!Array.isArray(data)) return

	events.value = data
		.map((item) => calendarEventParse(item, props.widget?.options))
		.filter((e) => e)

	calendarOptions.value = { ...calendarOptions.value, events: events.value }
})

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

onMounted(() => {
	borderRadius.value = (props.widget?.borderRadius || 0) + 'px'
})
</script>

<style scoped lang="scss">
.fc {
	--fc-event-bg-color: #6366f1;
	--fc-event-border-color: black;
}
@import '@/assets/css/component/calendar.scss';
</style>
