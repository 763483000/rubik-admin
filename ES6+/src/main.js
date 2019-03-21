import Vue from 'vue'
import Element from 'element-ui'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/element-ui/theme/index.css'
import '@/assets/styles/app.scss'

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
