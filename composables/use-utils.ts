import jsEscape from './utils/js-escape'
import jwtPayload from './utils/jwt-payload'
import getFileSrc from './utils/get-file-src'
import getStyles from './utils/get-styles'
import renderTemplate from './utils/render-template'
import parseJson from './utils/parse-json'
import filterItems from './utils/filter-items'

export const useUtils = () => {
	return {
		jwtPayload,
		getFileSrc,
		getStyles,
		jsEscape,
		renderTemplate,
		parseJson,
		filterItems,
	}
}
