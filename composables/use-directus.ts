import { Directus } from '@directus/sdk'

export const useDirectus = () => {
	const directus = useState(
		'directus',
		() => new Directus('http://localhost:3000/api')
	)
	return directus.value
}
