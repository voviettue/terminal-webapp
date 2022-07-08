import { Directus } from '@directus/sdk'

export const useDirectus = () => {
	const config = useRuntimeConfig()
	const directus = useState(
		'directus',
		() => new Directus(`${config.public?.url}/api`)
	)
	return directus.value
}
