import { defineStore } from 'pinia'
import { Page } from '~/shared/types'

export const usePageStore = defineStore({
	id: 'pagesStore',
	state: () => ({
		pages: null as Page[] | null,
		loading: false,
		error: null,
	}),
	getters: {},
	actions: {
		async hydrate() {
			const directus = useDirectus()
			this.loading = true

			try {
				const { data } = await directus.items('cms_pages').readByQuery()
				this.pages = data as unknown as Page[]
			} catch (error) {
				this.error = error
			} finally {
				this.loading = false
			}
		},
	},
})
