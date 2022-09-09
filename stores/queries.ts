import { defineStore } from 'pinia'
import { Query } from '~/shared/types'

export const useQueryStore = defineStore({
	id: 'queryStore',
	state: () => ({}),
	getters: {},
	actions: {
		async getByKeys(keys: string[]) {
			const directus = useDirectus()

			try {
				const res = await directus.items('cms_queries').readByQuery({
					filter: { _and: [{ key: { _in: keys } }] },
				})
				return res.data as Query[]
			} catch {
				//
			}
		},
		async refresh(query: Query) {
			if (!query.refresh_on_load) return null

			try {
				const directus = useDirectus()
				const token = directus.auth?.token
				const config = useRuntimeConfig()

				const data = await useFetch(
					`${config.public.api.baseUrl}/front-office/queries/${query.id}/execute`,
					{
						method: 'PATCH',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				return data
			} catch {
				//
			}
		},
	},
})
