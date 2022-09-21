import DisplayDate from '~/components/display/display-date.vue'
import DisplayPercentage from '~/components/display/display-percentage.vue'
import DisplayText from '~/components/display/display-text.vue'
import DisplayLink from '~/components/display/display-link.vue'
import DisplayNumber from '~/components/display/display-number.vue'
import DisplayButton from '~/components/display/display-button.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('display-date', DisplayDate)
	nuxtApp.vueApp.component('display-percentage', DisplayPercentage)
	nuxtApp.vueApp.component('display-text', DisplayText)
	nuxtApp.vueApp.component('display-link', DisplayLink)
	nuxtApp.vueApp.component('display-number', DisplayNumber)
	nuxtApp.vueApp.component('display-button', DisplayButton)
})
