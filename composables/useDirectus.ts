import { Directus } from '@directus/sdk'

export const useDirectus = () => {
	return new Directus('http://localhost:3000/api')
}
