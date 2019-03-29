define([
  'vue',
  'axios',
  'cookie',
  'lodash',
  'qs'
], function(Vue, Axios, Cookies, _, Qs) {
  var http = Axios.create({
    timeout: 1000 * 30,
    withCredentials: true
  });
  
  /**
   * 请求拦截
   */
  http.interceptors.request.use(function (config) {
    // token
    config.headers['token'] = Cookies.get('token')
    // 默认参数
    var defaults = {
      '_t': new Date().getTime()
    }
    if (config.method === 'get') {
      if (_.isPlainObject(config.params)) {
        config.params = _.merge(defaults, config.params)
      }
    } else if (config.method === 'post') {
      if (_.isPlainObject(config.data)) {
        config.data = _.merge(defaults, config.data)
      }
      if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
        config.data = Qs.stringify(config.data)
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  
  /**
   * 响应拦截
   */
  http.interceptors.response.use(function (response) {
    if (response.data && response.data.code === 401) { // 401, token失效
      window.location.href = '#/login'
    }
    return response
  }, error => {
    return Promise.reject(error)
  })

  return http;
});
