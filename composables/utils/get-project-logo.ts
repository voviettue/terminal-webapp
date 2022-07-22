import { Settings } from '@directus/shared/types'

export default function getProjectLogo(settings: Partial<Settings>): string {
	if (typeof settings?.project_logo === 'string') {
		const config = useRuntimeConfig()
		const directus = useDirectus()
		const token = directus.auth?.token

		const url = new URL(
			`/assets/${settings.project_logo}`,
			config.public.api.baseUrl
		)

		url.searchParams.append('key', 'system-medium-cover')
		url.searchParams.append('access_token', token)

		return url.href
	}

	return '/img/logo.png'
}
