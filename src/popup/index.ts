import { createApp } from 'vue'
import App from './Popup.vue'
import { Quasar } from 'quasar'

import './styles/global.scss'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

createApp(App).use(Quasar).mount('#app')
