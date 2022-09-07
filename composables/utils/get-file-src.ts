export default function getFileSrc(key: string): string {
	if (key) {
		const directus = useDirectus()
		const config = useRuntimeConfig()
		const token = directus.auth?.token

		const url = new URL(`${config.public?.url}/api//assets/${key}`)
		url.searchParams.append('access_token', token)

		return url.href
	}

	return null
}
