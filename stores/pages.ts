import { defineStore, storeToRefs } from 'pinia'
import { parseQuery } from '../utils/parse-query'
import { Page, Widget } from '~/shared/types'

export const usePageStore = defineStore({
	id: 'pageStore',
	state: () => ({
		pages: [] as Page[],
		context: {},
		loading: false,
		error: null,
	}),
	getters: {
		homepage(state): Page {
			const { useSettingStore } = useStore()
			const settingsStore = useSettingStore()
			const { settings } = storeToRefs(settingsStore)
			return settings.value?.homepage
				? state.pages.find((e) => e.id === settings.value.homepage)
				: state.pages?.[0]
		},
	},
	actions: {
		async hydrate() {
			const directus = useDirectus()
			this.loading = true

			try {
				const { data } = await directus.items('cms_pages').readByQuery({
					filter: {
						_and: [
							{
								hidden: {
									_neq: true,
								},
							},
						],
					},
				})
				this.pages = data
					? data.sort((a: any, b: any) => (a.sort ?? 1000) - (b.sort ?? 1000))
					: ([] as Page[])
			} catch (error) {
				this.error = error
			} finally {
				this.loading = false
			}
		},
		find(id: number | string): Page | undefined {
			return this.pages.find((page) => page.id.toString() === id.toString())
		},
		async initContext(widgets: Widget[]) {
			const { useWidgetStore, useQueryStore } = useStore()
			const widgetStore = useWidgetStore()
			const queryStore = useQueryStore()
			const queries: any = await widgetStore.getQueriesFromWidgets(widgets)
			const $query = {}
			for (const query of queries) {
				$query[query.key] = parseQuery(query) ?? null
			}
			const navigate = (name: string, params: Record<string, any> = {}) => {
				const page: Page = this.pages.find((e) => e.key === name)
				if (!page) return navigateTo({ path: name })

				const endpoint = page.endpoint
					.split('/')
					.map((e) => {
						if (e.startsWith(':')) {
							const key = e.replace(':', '')
							e = params?.[key] ?? e
						}
						return e
					})
					.join('/')

				return navigateTo({ path: endpoint })
			}
			const executeQuery = async (
				key: string,
				params: Record<string, any> = {}
			) => {
				const output = await queryStore.execute(key, params)
				// eslint-disable-next-line dot-notation
				this.context['$query'][key] = output
				return output
			}
			this.context = {
				$query,
				navigateTo: navigate,
				executeQuery,
			}
		},
	},
})
