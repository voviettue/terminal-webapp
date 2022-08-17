import { defineStore } from 'pinia'
import { Settings } from '~/shared/types'

const { getProjectLogo } = useUtils()

export const useSettingStore = defineStore({
	id: 'settingsStore',
	state: () => ({
		settings: null as Settings | null,
		loading: false,
		error: null,
	}),
	getters: {
		menus(): any[] {
			const menus = this.settings?.menus || []
			return menus
				.filter((e) => e.hidden !== true)
				.sort((a: any, b: any) => (a.sort ?? 1000) - (b.sort ?? 1000))
		},
		projectLogoImg(): string | null {
			return getProjectLogo(this.settings)
		},
		logoBackgroundColor(): string | null {
			return this.settings?.project_background || 'transparent'
		},
	},
	actions: {
		async hydrate() {
			const directus = useDirectus()
			this.loading = true

			const fields = [
				'homepage',
				'project_name',
				'project_logo',
				'project_background',
				'menus.*',
			]

			try {
				const { data } = await directus
					.items('cms_settings')
					.readByQuery({ fields })
				this.settings = data
			} catch (error) {
				this.error = error
			} finally {
				this.loading = false
			}
		},
	},
})
