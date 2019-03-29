define([
  'vue',
  'text!./home.html',
], function(Vue, tmpl) {
  return {
    template: tmpl,
    data: function () {
      return {
        menuList: [],
        indexNoticeTabsActive: '1',
        indexPersonalTabsActive: '1'
      }
    },
    created: function () {
    },
    methods: {
    }
  };
});