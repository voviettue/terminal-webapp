import { strToSlug } from './str-to-slug'

export function convertInputName(str) {
	if (!str) return undefined
	return strToSlug(str).replace('-', '_')
}
