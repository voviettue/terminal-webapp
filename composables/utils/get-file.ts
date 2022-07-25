export default function getUserAvatar(key: string): string {
	if (key) {
		const directus = useDirectus()
		const config = useRuntimeConfig()
		const token = directus.auth?.token

		const url = new URL(`/assets/${key}`, config.public.api.baseUrl)
		url.searchParams.append('access_token', token)

		return url.href
	}

	return ''
}
