import jwtPayload from './utils/jwt-payload'
import getUserAvatar from './utils/get-user-avatar'
import getProjectLogo from './utils/get-project-logo'

export const useUtils = () => {
	return {
		jwtPayload,
		getUserAvatar,
		getProjectLogo,
	}
}
