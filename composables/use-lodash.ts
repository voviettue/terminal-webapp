import escape from 'lodash/escape'
import get from 'lodash/get'
import upperCase from 'lodash/upperCase'

export const useLodash = () => {
	return {
		escape,
		get,
		upperCase,
	}
}
