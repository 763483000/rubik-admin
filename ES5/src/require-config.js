(function () {
  require.config({
    baseUrl: './',
    urlArgs: 'v=' + (window.APP_CONFIG.env === 'dev' ? new Date().getTime() : window.APP_CONFIG.version),
    waitSeconds: 0,
    map: {
      '*': {
        css: ['assets/plugins/require-css-0.1.10/css.min']
      }
    },
    paths: {
      axios: 'assets/plugins/axios-0.18.0/axios.min',
      echarts: 'assets/plugins/echarts-3.8.5/echarts.min',
      ELEMENT: 'assets/plugins/element-2.4.5/index',
      promise: 'assets/plugins/es6-promise-4.2.4/es6-promise.auto.min',
      cookie: 'assets/plugins/js-cookie-2.2.0/js-cookie.min',
      lodash: 'assets/plugins/lodash-4.17.10/lodash.min',
      qs: 'assets/plugins/qs-6.5.2/qs.min',
      quill: 'assets/plugins/quill-1.3.6/quill.min',
      text: 'assets/plugins/require-text-2.0.15/text.min',
      screenfull: 'assets/plugins/screenfull-3.3.2/screenfull.min',
      vue: (window.APP_CONFIG.env === 'dev' ? 'assets/plugins/vue-2.5.17/vue' : 'assets/plugins/vue-2.5.17/vue.min'),
      'vue-i18n': 'assets/plugins/vue-i18n-8.1.0/vue-i18n.min',
      'vue-router': 'assets/plugins/vue-router-3.0.1/vue-router.min',
      vuex: 'assets/plugins/vuex-3.0.1/vuex.min',
    },
    shim: {
      ELEMENT: { deps: ['vue'] },
      quill: { deps: ['css!assets/plugins/quill-1.3.6/quill.snow.css'] },
      vueRouter: { deps: ['vue', 'promise'] },
      vuex: { deps: ['vue', 'promise'] },
    },
  });
})();
