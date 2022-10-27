import WidgetContainer from '~~/components/widget/widget-container.vue'
import WidgetImage from '~/components/widget/widget-image.vue'
import WidgetTable from '~/components/widget/widget-table.vue'
import WidgetText from '~/components/widget/widget-text.vue'
import WidgetRichText from '~/components/widget/widget-richText.vue'
import WidgetIframe from '~/components/widget/widget-iframe.vue'
import WidgetDivider from '~/components/widget/widget-divider.vue'
import WidgetList from '~/components/widget/widget-list.vue'
import WidgetKeyValue from '~/components/widget/widget-keyValue.vue'
import WidgetLink from '~/components/widget/widget-link.vue'
import WidgetButton from '~/components/widget/widget-button.vue'
import WidgetIconButton from '~/components/widget/widget-icon-button.vue'
import WidgetCalendar from '~/components/widget/widget-calendar.vue'
import WidgetTextInput from '~/components/widget/widget-text-input.vue'
import WidgetNumberInput from '~/components/widget/widget-number-input.vue'
import WidgetSelect from '~/components/widget/widget-select.vue'
import widgetTabs from '~/components/widget/widget-tabs.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('widget-container', WidgetContainer)
	nuxtApp.vueApp.component('widget-image', WidgetImage)
	nuxtApp.vueApp.component('widget-table', WidgetTable)
	nuxtApp.vueApp.component('widget-text', WidgetText)
	nuxtApp.vueApp.component('widget-richText', WidgetRichText)
	nuxtApp.vueApp.component('widget-iframe', WidgetIframe)
	nuxtApp.vueApp.component('widget-divider', WidgetDivider)
	nuxtApp.vueApp.component('widget-list', WidgetList)
	nuxtApp.vueApp.component('widget-keyValue', WidgetKeyValue)
	nuxtApp.vueApp.component('widget-link', WidgetLink)
	nuxtApp.vueApp.component('widget-button', WidgetButton)
	nuxtApp.vueApp.component('widget-icon-button', WidgetIconButton)
	nuxtApp.vueApp.component('widget-calendar', WidgetCalendar)
	nuxtApp.vueApp.component('widget-text-input', WidgetTextInput)
	nuxtApp.vueApp.component('widget-number-input', WidgetNumberInput)
	nuxtApp.vueApp.component('widget-select', WidgetSelect)
	nuxtApp.vueApp.component('widget-tabs', widgetTabs)
})
