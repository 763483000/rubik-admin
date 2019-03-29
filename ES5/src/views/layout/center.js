define([
  'text!./center.html',
  '../modules/home'
], function(tmpl, Home) {
  return {
    template: tmpl,
    data: function() {
      return {
      };
    },
    components: {
      Home: Home
    },
    created: function() {
    },
    methods: {
    },
  };
});
