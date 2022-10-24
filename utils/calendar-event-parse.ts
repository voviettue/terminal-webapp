import { format, isValid } from 'date-fns'
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
		startDate?.getHours() === 0 &&
		startDate?.getMinutes() === 0 &&
		startDate?.getSeconds() === 0
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
		title: renderDisplayTemplate(item, options),
		start: startDate,
		end: endDate,
		allDay,
	}
}

function renderDisplayTemplate(
	item: Record<string, any>,
	widgets: Record<string, any>
) {
	const template = widgets?.displayTemplate

	const regex = /({{.*?}})/g
	const newInnerHTML = template
		.split(regex)
		.map((part) => {
			if (part.startsWith('{{') === false) {
				return `<span class="text">${part}</span>`
			}

			const fieldKey = part.replace(/({|})/g, '').trim()
			const value = item[fieldKey]

			if (value === null || value === undefined || value === '') return ''

			const matchCondition = widgets?.conditionStyle?.find(
				(e: any) => fieldKey === e?.conditionField && e?.value === value
			)

			const style = matchCondition?.background
				? `"background-color:${matchCondition.background}; color:${
						matchCondition?.textColor || 'unset'
				  }; padding: 1px 4px 1px 4px; margin: 4px 4px 0 4px; border-radius: 4px"`
				: `"color:${matchCondition?.textColor || 'unset'};"`

			return `<span contenteditable="false" data-field="${fieldKey}" style=${style}>${value}</span>`
		})
		.join('')

	return newInnerHTML
}
