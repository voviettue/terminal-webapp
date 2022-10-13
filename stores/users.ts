/* eslint-disable camelcase */
import { defineStore } from 'pinia'
import { User } from '@directus/shared/types'

const { getFileSrc } = useUtils()

export const useUserStore = defineStore({
	id: 'userStore',
	state: () => ({
		user: null as User | null,
		loading: false,
		error: null,
	}),
	getters: {
		avatarImg(): string | null {
			return getFileSrc(this.user?.avatar?.id)
		},
	},
	actions: {
		async hydrate() {
			const directus = useDirectus()
			this.loading = true

			const fields = [
				'id',
				'first_name',
				'last_name',
				'email',
				'avatar',
				'avatar.type',
				'avatar.title',
				'avatar.id',
				'location',
				'title',
			]

			try {
				this.user = await directus.users.me.read({ fields })
			} catch (error) {
				this.error = error
			} finally {
				this.loading = false
			}
		},
	},
})
