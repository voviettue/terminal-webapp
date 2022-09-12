import { defineStore } from 'pinia'
import { Widget } from '~/shared/types'

function findQueries(str: string) {
	const regex = /\$query.(\w+)/g
	const matches = [...str.matchAll(regex)] ?? []

	return matches.map((e) => e[1])
}

export const useWidgetStore = defineStore({
	id: 'widgetStore',
	state: () => ({
		loading: false,
		error: null,
	}),
	actions: {
		async getQueriesFromWidgets(widgets: Widget[]) {
			let keys = []
			for (const widget of widgets) {
				keys = keys.concat(findQueries(JSON.stringify(widget.options)))
			}
			const { useQueryStore } = useStore()
			const queryStore = useQueryStore()
			const queries = await queryStore.getByKeys(keys)
			for (let i = 0; i < queries.length; i++) {
				queries[i] = await queryStore.refresh(queries[i])
			}
			return queries
		},
	},
})
