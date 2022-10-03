import { defineStore } from 'pinia'
import { Query } from '~/shared/types'
import { parseQuery } from '~~/utils/parse-query'

export const useQueryStore = defineStore({
	id: 'queryStore',
	state: () => ({
		queries: [] as Query[],
	}),
	getters: {},
	actions: {
		async getByKey(key: string) {
			const queries: Query[] = await this.getItems({
				filter: { _and: [{ key: { _in: [key] } }] },
			})
			return queries.unshift()
		},
		async getByKeys(keys: string[]) {
			if (!keys || keys.length === 0) return []

			const queries = await this.getItems({
				filter: { _and: [{ key: { _in: keys } }] },
			})
			this.queries = queries
			return queries
		},
		async getItems(query: Record<string, any> = {}): Promise<Query[]> {
			const directus = useDirectus()

			try {
				const res = await directus.items('cms_queries').readByQuery(query)
				return (res.data ?? []) as Query[]
			} catch {
				return [] as Query[]
			}
		},
		async refresh(query: Query) {
			if (!query.refresh_on_load) return query

			const route = useRoute()
			const output = await this.execute(query.key, route.params)
			return { ...query, output }
		},
		async execute(key: string, params: Record<string, any> = {}) {
			let query = this.queries.find((e) => e.key === key)
			if (!query) {
				const queries = await this.getByKeys([key])
				query = queries.find((e) => e.key === key)
			}

			if (!query) return null

			try {
				const directus = useDirectus()
				const token = directus.auth?.token
				const config = useRuntimeConfig()

				const { data } = await useFetch(
					`${config.public.url}/api/front-office/queries/${query.id}/execute`,
					{
						method: 'PATCH',
						body: params,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				const { cloneDeep } = useLodash()
				const output = cloneDeep(data?.value) ?? null
				return parseQuery({ ...query, output })
			} catch {
				return null
			}
		},
	},
})
