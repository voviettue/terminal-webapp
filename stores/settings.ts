import { defineStore } from 'pinia'
import { Settings } from '@directus/shared/types'

const { getProjectLogo } = useUtils()

export const useSettingStore = defineStore({
	id: 'settingsStore',
	state: () => ({
		settings: null as Settings | null,
		loading: false,
		error: null,
	}),
	getters: {
		projectLogoImg(): string | null {
			return getProjectLogo(this.settings)
		},
		logoBackgroundColor(): string | null {
			return this.settings.project_color || 'transparent'
		},
	},
	actions: {
		async hydrate() {
			const directus = useDirectus()
			this.loading = true

			const fields = ['project_name', 'project_logo', 'project_color']

			try {
				this.settings = await directus.settings.read({ fields })
			} catch (error) {
				this.error = error
			} finally {
				this.loading = false
			}
		},
	},
})
