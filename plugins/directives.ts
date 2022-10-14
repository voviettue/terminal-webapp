import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('tooltip', {
		mounted(el, binding) {
			let value = binding.value
			if (!value) return
			if (typeof value === 'string') {
				value = { content: value }
			}
			tippy(el, value)
		},
	})
})
