import WidgetContainer from '~~/components/widget/widget-container.vue'
import WidgetImage from '~/components/widget/widget-image.vue'
import WidgetTable from '~/components/widget/widget-table.vue'
import WidgetText from '~/components/widget/widget-text.vue'
import WidgetRichText from '~/components/widget/widget-richText.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('widget-container', WidgetContainer)
	nuxtApp.vueApp.component('widget-image', WidgetImage)
	nuxtApp.vueApp.component('widget-table', WidgetTable)
	nuxtApp.vueApp.component('widget-text', WidgetText)
	nuxtApp.vueApp.component('widget-richText', WidgetRichText)
})
