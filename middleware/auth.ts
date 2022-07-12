import { useDirectus } from '~/composables/use-directus'

export default defineNuxtRouteMiddleware(() => {
	const directus = useDirectus()
	const token = directus.auth?.token

	if (!token) {
		navigateTo('/sign-in')
	}
})
