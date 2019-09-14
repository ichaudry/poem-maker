import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  icons: {
    iconfont: 'mdiSVG'
  },
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
