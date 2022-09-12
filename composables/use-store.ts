import { useUserStore } from '@/stores/users'
import { usePageStore } from '@/stores/pages'
import { useSettingStore } from '@/stores/settings'
import { useQueryStore } from '@/stores/queries'
import { useWidgetStore } from '@/stores/widgets'

export const useStore = () => {
	return {
		useUserStore,
		usePageStore,
		useQueryStore,
		useSettingStore,
		useWidgetStore,
	}
}
