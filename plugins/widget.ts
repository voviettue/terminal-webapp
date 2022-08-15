import WidgetBox from '~/components/widget/widget-box.vue'
import WidgetImage from '~/components/widget/widget-image.vue'
import WidgetTable from '~/components/widget/widget-table.vue'
import WidgetText from '~/components/widget/widget-text.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('widget-box', WidgetBox)
	nuxtApp.vueApp.component('widget-image', WidgetImage)
	nuxtApp.vueApp.component('widget-table', WidgetTable)
	nuxtApp.vueApp.component('widget-text', WidgetText)
})
