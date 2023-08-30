import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VSkeletonLoader } from 'vuetify/labs/components'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            fa,
            mdi,
        }
    },
    components: {
        ...components,
        VSkeletonLoader
    },
    directives,
})



import store from './store'

const app = createApp(App)

app.use(VueCookies, { expires: '1d' })
app.use(vuetify)
app.use(router)
app.use(store)

app.mount('#app')

