import jsEscape from './utils/js-escape'
import jwtPayload from './utils/jwt-payload'
import getUserAvatar from './utils/get-user-avatar'
import getProjectLogo from './utils/get-project-logo'
import getFileSrc from './utils/get-file-src'
import getStyles from './utils/get-styles'

export const useUtils = () => {
	return {
		jwtPayload,
		getUserAvatar,
		getProjectLogo,
		getFileSrc,
		getStyles,
		jsEscape,
	}
}
