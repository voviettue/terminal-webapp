import { defineStore, storeToRefs } from 'pinia'
import { Page, Widget } from '~/shared/types'

function findQueries(str: string) {
	const regex = /\$query.(\w+)/g
	const matches = [...str.matchAll(regex)] ?? []

	return matches.map((e) => e[1])
}

async function getQueriesFromWidgets(widgets: Widget[]) {
	let keys = []
	for (const widget of widgets) {
		keys = keys.concat(findQueries(JSON.stringify(widget.options)))
	}
	const { useQueryStore } = useStore()
	const queryStore = useQueryStore()
	return await queryStore.getByKeys(keys)
}

export const usePageStore = defineStore({
	id: 'pagesStore',
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
				this.pages = data ?? ([] as Page[])
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
			const queries = await getQueriesFromWidgets(widgets)
			const $query = {}
			for (const query of queries) {
				$query[query.key] = JSON.parse(query.output) ?? null
			}
			this.context = { $query }
		},
	},
})
