import MenuCategory from '~/components/menu/menu-category.vue'
import MenuLink from '~/components/menu/menu-link.vue'
import Menupage from '~/components/menu/menu-page.vue'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('menu-category', MenuCategory)
	nuxtApp.vueApp.component('menu-link', MenuLink)
	nuxtApp.vueApp.component('menu-page', Menupage)
})
