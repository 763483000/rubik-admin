define([
  'text!./layout.html',
  './north',
  './west',
  './center',
  './east',
  './south',
], function(tmpl, North, West, Center, East, South) {
  return {
    template: tmpl,
    data: function() {
      return {
        loading: true,
      };
    },
    components: {
      North,
      West,
      Center,
      East,
      South,
    },
    created: function() {
      window.setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    methods: {
    },
  };
});
