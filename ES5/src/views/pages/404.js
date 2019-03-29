define([
  'vue',
  'text!./404.html'
], function(Vue, tmpl) {
  return {
    template: tmpl,
    data: function () {
      return {
        menuList: []
      }
    },
    created: function () {
    },
    methods: {
    }
  };
});