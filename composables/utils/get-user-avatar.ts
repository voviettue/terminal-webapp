import { User } from '@directus/shared/types'

export default function getUserAvatar(user: Partial<User>): string {
	if (user?.avatar?.id) {
		const directus = useDirectus()
		const config = useRuntimeConfig()
		const token = directus.auth?.token

		const url = new URL(`/assets/${user.avatar.id}`, config.public.api.baseUrl)

		url.searchParams.append('key', 'system-medium-cover')
		url.searchParams.append('access_token', token)

		return url.href
	}

	return ''
}
