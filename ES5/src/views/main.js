define([
  'text!./main.html',
  './layout/header',
  './layout/aside',
  './layout/control',
  './layout/main',
  './layout/footer',
], function(tmpl, layoutHeader, layoutAside, layoutMain, layoutControl, layoutFooter) {
  var self = null;

  return {
    template: tmpl,
    data: function () {
      return {
        loading: true
      }
    },
    components: {
      layoutHeader,
      layoutAside,
      layoutMain,
      layoutControl,
      layoutFooter
    },
    beforeCreate: function () {
      self = this;
    },
    created: function () {
      self.loading = false;
    }
  };
});