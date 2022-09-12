import escape from 'lodash/escape'
import get from 'lodash/get'
import upperCase from 'lodash/upperCase'
import cloneDeep from 'lodash/cloneDeep'

export const useLodash = () => {
	return {
		escape,
		get,
		upperCase,
		cloneDeep,
	}
}
