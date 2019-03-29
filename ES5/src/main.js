define([
  'vue',
  'ELEMENT',
  'router/index',
  'store/index',
  'icons/iconfont',
  'css!./assets/element-theme/green.min.css',
  'css!./assets/ra-theme/green.min.css',
], function(Vue, ELEMENT, router, store) {
  Vue.use(ELEMENT);

  window.vm = new Vue({
    router: router,
    store: store,
  }).$mount('#app');
});