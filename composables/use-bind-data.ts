import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

export const useBindData = (
	template: string,
	localContext: Record<string, any> = {}
) => {
	const { usePageStore } = useStore()
	const { renderTemplate } = useUtils()
	const pageStore = usePageStore()
	const { context: pageContext } = storeToRefs(pageStore)
	const result = ref(template)
	watchEffect(async () => {
		const context = {
			...pageContext.value,
			...localContext,
		}
		result.value = await renderTemplate(template, context)
	})

	return { result }
}
