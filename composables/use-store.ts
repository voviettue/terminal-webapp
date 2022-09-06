import { useUserStore } from '@/stores/users'
import { usePageStore } from '@/stores/pages'
import { useSettingStore } from '@/stores/settings'
import { useQueryStore } from '@/stores/queries'

export const useStore = () => {
	return {
		useUserStore,
		usePageStore,
		useQueryStore,
		useSettingStore,
	}
}
