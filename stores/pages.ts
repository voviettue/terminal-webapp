import { defineStore, storeToRefs } from 'pinia'
import { Page } from '~/shared/types'

export const usePageStore = defineStore({
	id: 'pagesStore',
	state: () => ({
		pages: [] as Page[],
		loading: false,
		error: null,
	}),
	getters: {
		getHome(state): Page {
			const { useSettingStore } = useStore()
			const settingsStore = useSettingStore()
			const { settings } = storeToRefs(settingsStore)
			return settings.value.homepage
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
						hidden: {
							_neq: true,
						},
					},
				})
				this.pages = data ?? ([] as Page[])
			} catch (error) {
				this.error = error
			} finally {
				this.loading = false
			}
		},
	},
})
