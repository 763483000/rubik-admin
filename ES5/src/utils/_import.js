define([
  'require',
  'lodash',
], function(require, _) {
  return function(dep) {
    return function() {
      return new Promise(function(resolve, reject) {
        require(_.isArray(dep) ? dep : [dep], function(res) {
          resolve(res);
        });
      });
    };
  };
});
