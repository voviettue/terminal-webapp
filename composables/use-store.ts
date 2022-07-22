import { useUserStore } from '@/stores/users'
import { useSettingStore } from '@/stores/settings'

export const useStore = () => {
	return {
		useUserStore,
		useSettingStore,
	}
}
