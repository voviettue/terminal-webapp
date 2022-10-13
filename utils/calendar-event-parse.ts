import { format, isValid } from 'date-fns'
import { getFieldsFromTemplate } from '@directus/shared/utils'
import { get, set } from 'lodash'
import { render } from 'micromustache'
import parseDate from './parse-date'

export function calendarEventParse(item: any, options: any) {
	if (!options?.startDateField || !parseDate(item[options?.startDateField])) {
		return null
	}

	let endDate = ''

	let isDateFormat = false
	const startDate = parseDate(item[options?.startDateField])

	if (
		!options?.endDateField &&
		isValid(startDate) &&
		startDate?.getUTCHours() === 0 &&
		startDate?.getUTCMinutes() === 0 &&
		startDate?.getUTCSeconds() === 0
	) {
		isDateFormat = true
	}

	const allDay =
		isDateFormat ||
		(item[options?.endDateField] && parseDate(item[options?.endDateField]))

	if (options?.endDateField) {
		if (allDay && isValid(allDay)) {
			const date = parseDate(item[options?.endDateField])
			// FullCalendar uses exclusive end moments, so we'll have to increment the end date by 1 to get the
			// expected result in the calendar
			date.setDate(date.getDate() + 1)
			endDate = format(date, 'yyyy-MM-dd')
		} else {
			const date = parseDate(item[options?.endDateField])
			endDate = date ? format(date, 'yyyy-MM-dd') : null
		}
	}

	return {
		id: item?.id,
		title:
			renderDisplayStringTemplate(item, options?.displayTemplate) || item?.name,
		start: startDate,
		end: endDate,
		allDay,
	}
}

function renderDisplayStringTemplate(
	item: Record<string, any>,
	template: string
) {
	const fields = getFieldsFromTemplate(template)
	const parsedItem: Record<string, any> = {}

	for (const key of fields) {
		set(parsedItem, key, get(item, key))
	}

	return renderPlainStringTemplate(template, parsedItem)
}

export function renderPlainStringTemplate(
	template: string,
	item?: Record<string, any> | null
): string | null {
	const fieldsInTemplate = getFieldsFromTemplate(template)

	if (!item || !template || !fieldsInTemplate) return null

	try {
		return render(template, item, { propsExist: true }) || '—'
	} catch {
		return '—'
	}
}
