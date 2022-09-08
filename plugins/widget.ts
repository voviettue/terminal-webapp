import WidgetContainer from '~~/components/widget/widget-container.vue'
import WidgetImage from '~/components/widget/widget-image.vue'
import WidgetTable from '~/components/widget/widget-table.vue'
import WidgetText from '~/components/widget/widget-text.vue'
import WidgetRichText from '~/components/widget/widget-richText.vue'
import WidgetIframe from '~/components/widget/widget-iframe.vue'
import WidgetDivider from '~/components/widget/widget-divider.vue'
import WidgetList from '~/components/widget/widget-list.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('widget-container', WidgetContainer)
	nuxtApp.vueApp.component('widget-image', WidgetImage)
	nuxtApp.vueApp.component('widget-table', WidgetTable)
	nuxtApp.vueApp.component('widget-text', WidgetText)
	nuxtApp.vueApp.component('widget-richText', WidgetRichText)
	nuxtApp.vueApp.component('widget-iframe', WidgetIframe)
	nuxtApp.vueApp.component('widget-divider', WidgetDivider)
	nuxtApp.vueApp.component('widget-list', WidgetList)
})
