import { useDirectus } from '~/composables/use-directus'

export default defineNuxtRouteMiddleware(() => {
	const directus = useDirectus()
	const token = directus.auth?.token

	if (!token) {
		return navigateTo('/sign-in')
	}
})
