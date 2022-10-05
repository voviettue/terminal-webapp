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
	initialDate: props.widget?.defaultDate || null,
	now: props.widget?.defaultDate || null,
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

function onItemClick() {
	if (!props.widget?.onItemClick) return
	const context = { ...pageStore.context, ...props.widget.context }
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const AsyncFunction = async function () {}.constructor
	const fn = AsyncFunction(...Object.keys(context), props.widget.onItemClick)
	fn(...Object.values(context))
}

function onDateClick() {
	if (!props.widget?.onDateClick) return
	const context = { ...pageStore.context, ...props.widget.context }
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
.fc :deep(.fc-daygrid-day.fc-day-today) {
	background-color: rgb(256 256 256 / var(--tw-bg-opacity));
	.fc-daygrid-day-number {
		width: 2rem;
		height: 2rem;
		background-color: rgb(79 70 229 / var(--tw-bg-opacity));
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
}
.fc :deep(.fc-daygrid-day-top) {
	padding: 1rem 0 0 1rem;
	flex-direction: row;
}
.fc :deep(.fc-daygrid-day-number) {
	color: rgb(17 24 39 / var(--tw-text-opacity));
}
:deep(a) {
	color: rgb(17 24 39 / var(--tw-text-opacity));
	&:not(.fc-daygrid-event) &:hover {
		background: transparent;
		color: rgb(79 70 229 / var(--tw-text-opacity));
	}
}
:deep(.fc-daygrid-event-dot) {
	border: none;
	margin: 0 0.25rem 0 0.875rem;
}
:deep(.fc-day.fc-day-other) {
	background-color: transparent;
}
:deep(.fc-day) {
	background-color: rgb(256 256 256 / var(--tw-bg-opacity));
}
.fc :deep(.fc-toolbar.fc-header-toolbar) {
	margin-bottom: 0;
	padding: 1rem 1.5rem;
	border: 1px solid var(--fc-border-color, #ddd);
	border-bottom: none;
	background-color: rgb(249 250 251 / var(--tw-bg-opacity));
	border-top-left-radius: v-bind(borderRadius);
	border-top-right-radius: v-bind(borderRadius);
	.fc-toolbar-chunk {
		&:not(:last-child):not(:first-child) {
			flex-grow: 1;
			text-align: right;
			margin-right: 1rem;
		}
	}
}
:deep(.fc-button-group) {
	.fc-button {
		text-transform: capitalize;
		background-color: rgb(256 256 256 / var(--tw-bg-opacity));
		color: rgb(209 213 219 / var(--tw-border-opacity));
		border-color: black;
		&:first-child {
			border-right: none;
		}
		&:last-child {
			border-left: none;
		}
		&:not(:last-child):not(:first-child) {
			opacity: 1;
			border-left: none;
			border-right: none;
		}
		&:hover {
			--tw-bg-opacity: 1;
			background-color: black;
			color: white;
		}
		&.fc-button-active,
		&:active {
			background-color: black;
			color: white;
		}
		&:focus,
		&:focus-visible {
			outline: none;
			box-shadow: none !important;
		}
	}
}
.calendar-rounded {
	border-bottom-left-radius: v-bind(borderRadius);
	border-bottom-right-radius: v-bind(borderRadius);
}
:deep(.fc-scrollgrid) {
	border-bottom-left-radius: v-bind(borderRadius);
}
:deep(.fc-scrollgrid-section-liquid) {
	> td {
		border-bottom-left-radius: v-bind(borderRadius);
		border-bottom-right-radius: v-bind(borderRadius);
	}
	table {
		tr:last-child {
			td:last-child {
				border-bottom-right-radius: v-bind(borderRadius);
			}
			td:first-child {
				border-bottom-left-radius: v-bind(borderRadius);
			}
		}
	}
}
.fc .fc-scroller-harness-liquid :deep(.fc-scroller) {
	border-bottom-left-radius: v-bind(borderRadius);
	border-bottom-right-radius: v-bind(borderRadius);
}
</style>
