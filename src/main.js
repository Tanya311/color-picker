import Vue from 'vue'
import App from './App.vue'
import { Chrome } from 'vue-color'

import './assets/scss/main.scss'

Vue.config.productionTip = false
Vue.component('chrome-picker', Chrome);

new Vue({
  render: h => h(App),
}).$mount('#app')
