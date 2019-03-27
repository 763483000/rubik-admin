import Vue from 'vue';
import Element from 'element-ui';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/icons';
import '@/../public/element-theme/green.css';
import '@/assets/styles/app.scss';

Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
