/* eslint-disable import/no-duplicates */
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'

export const useDateFns = () => {
	return {
		format,
		isValid,
	}
}
