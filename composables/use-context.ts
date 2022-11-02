type Action = CallableFunction

export const useContext = () => {
	const executeAction = async (action: Action, context = {}) => {
		if (!action) return
		if (typeof action === 'function') {
			await action()
		}
		const { usePageStore } = useStore()
		const pageStore = usePageStore()

		const ctx = { ...pageStore.context, ...context }
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		const AsyncFunction = async function () {}.constructor
		const fn = AsyncFunction(...Object.keys(ctx), action)
		fn(...Object.values(ctx))
	}

	return {
		executeAction,
	}
}
