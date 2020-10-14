import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index'
import store from '@/store/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)
library.add(faTrash)
library.add(faAngleRight)
library.add(faCheck)
library.add(faCircle)
library.add(faCloudUploadAlt)
library.add(faCog)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import Notifications from 'vue-notification'
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
