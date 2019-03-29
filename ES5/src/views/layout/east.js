define([
  'text!./east.html',
], function(tmpl) {
  return {
    template: tmpl,
    data: function() {
      return {
        skin: 'orange',
        skinList: [
          { name: 'blue'     , color: '#3E8EF7', remark: '蓝色' },
          { name: 'brown'    , color: '#997B71', remark: '棕色' },
          { name: 'cyan'     , color: '#0BB2D4', remark: '青色' },
          { name: 'gray'     , color: '#757575', remark: '灰色' },
          { name: 'green'    , color: '#11C26D', remark: '绿色' },
          { name: 'indigo'   , color: '#667AFA', remark: '靛青色' },
          { name: 'orange'   , color: '#EB6709', remark: '橙色' },
          { name: 'pink'     , color: '#F74584', remark: '粉红色' },
          { name: 'purple'   , color: '#9463F7', remark: '紫色' },
          { name: 'red'      , color: '#FF4C52', remark: '红色' },
          { name: 'turquoise', color: '#17B3A3', remark: '蓝绿色' },
          { name: 'yellow'   , color: '#FCB900', remark: '黄色' },
        ],
      };
    },
    created: function() {
    },
    methods: {
      // 皮肤切换
      skinChangeHandle: function (val) {
        var styleList = [
          {
            id: 'J_elementTheme',
            url: './element-theme/' + val + '.min.css?t=' + new Date().getTime(),
          },
          {
            id: 'J_raSKin',
            url: './ra-theme/' + val + '.min.css?t=' + new Date().getTime(),
          }
        ];
        for (var i = 0; i < styleList.length; i++) {
          var el = document.querySelector('#' + styleList[i].id);
          if (el) {
            el.href = styleList[i].url;
            continue;
          }
          el = document.createElement('link');
          el.id = styleList[i].id;
          el.href = styleList[i].url;
          el.rel = 'stylesheet';
          document.querySelector('head').appendChild(el);
        }
      },
    },
  };
});
