import { useUserStore } from '@/stores/users'
import { usePageStore } from '@/stores/pages'
import { useSettingStore } from '@/stores/settings'

export const useStore = () => {
	return {
		useUserStore,
		usePageStore,
		useSettingStore,
	}
}
