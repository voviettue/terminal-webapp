import DisplayDate from '~/components/display/display-date.vue'
import DisplayPercent from '~/components/display/display-percent.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('display-date', DisplayDate)
	nuxtApp.vueApp.component('display-percent', DisplayPercent)
})
