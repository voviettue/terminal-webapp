import jsEscape from './utils/js-escape'
import jwtPayload from './utils/jwt-payload'
import getFileSrc from './utils/get-file-src'
import getStyles from './utils/get-styles'
import renderTemplate from './utils/render-template'

export const useUtils = () => {
	return {
		jwtPayload,
		getFileSrc,
		getStyles,
		jsEscape,
		renderTemplate,
	}
}
