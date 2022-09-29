import { format, isValid, parseISO } from 'date-fns'

export function calendarEventParse(item: any, options: any) {
	if (!options?.startDateField) return null

	let endDate = ''

	const allDay =
		item[options?.endDateField] && new Date(item[options?.endDateField])

	if (options?.endDateField) {
		if (allDay && isValid(allDay)) {
			const date = parseISO(item[options?.endDateField])
			// FullCalendar uses exclusive end moments, so we'll have to increment the end date by 1 to get the
			// expected result in the calendar
			date.setDate(date.getDate() + 1)
			endDate = format(date, 'yyyy-MM-dd')
		} else {
			endDate = item[options?.endDateField]
		}
	}

	return {
		id: item?.id,
		title:
			renderDisplayStringTemplate(item, options?.displayTemplate) || item?.name,
		start: item[options?.startDateField],
		end: endDate,
		allDay,
	}
}

function renderDisplayStringTemplate(
	item: Record<string, any>,
	displayTemplate: string
) {
	const keys = displayTemplate.replaceAll(' ', '').split(',')
	let result = ''

	keys?.forEach((key: string) => {
		result += `${item[key]} `
	})

	return result
}
