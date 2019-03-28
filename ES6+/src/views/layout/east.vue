<template>
  <aside class="ra-east">
    <div v-if="!$store.state.headerFixed && $store.state.controlFixed" class="ra-east__toggle" @click="$store.state.controlOpen = !$store.state.controlOpen">
      <svg class="icon-svg" aria-hidden="true"><use xlink:href="#setting"></use></svg>
    </div>
    <div class="ra-east__inner">
      <div class="ra-east__bd">
        <el-tabs class="ra-tabs ra-tabs--flex" v-model="$store.state.controlTabsActive">
          <el-tab-pane label="Layout" name="layout">
            <dl class="ra-east__setting">
              <dt>Wrapper</dt>
              <dd><el-checkbox v-model="$store.state.wrapperCenter">Center 居中</el-checkbox></dd>
            </dl>
            <dl class="ra-east__setting">
              <dt>Header</dt>
              <dd><el-checkbox v-model="$store.state.headerFixed" :disabled="$store.state.wrapperCenter">Fixed 固定</el-checkbox></dd>
              <dd><el-checkbox v-model="$store.state.headerSkin" true-label="colorful" false-label="white">Colorful 鲜艳</el-checkbox></dd>
            </dl>
            <dl class="ra-east__setting">
              <dt>Aside</dt>
              <dd><el-checkbox v-model="$store.state.asideFixed" :disabled="$store.state.wrapperCenter">Fixed 固定</el-checkbox></dd>
              <dd><el-checkbox v-model="$store.state.asideSkin" true-label="dark" false-label="white">Dark 鲜艳</el-checkbox></dd>
              <dd><el-checkbox v-model="$store.state.asideTop">Top 至头部</el-checkbox></dd>
            </dl>
            <dl class="ra-east__setting">
              <dt>Control</dt>
              <dd><el-checkbox v-model="$store.state.controlFixed" :disabled="$store.state.wrapperCenter">Fixed 固定</el-checkbox></dd>
            </dl>
            <dl class="ra-east__setting">
              <dt>Main</dt>
              <dd><el-checkbox v-model="$store.state.mainType" true-label="tabs" false-label="standard">Tabs 标签页</el-checkbox></dd>
            </dl>
            <dl class="ra-east__setting">
              <dt>Main-tabs</dt>
              <dd><el-checkbox v-model="$store.state.mainTabsHeaderFixed" :disabled="$store.state.wrapperCenter || $store.state.mainType !== 'tabs'">Header Fixed 固定</el-checkbox></dd>
            </dl>
          </el-tab-pane>
          <el-tab-pane label="Skins" name="skins">
            <dl class="ra-east__setting">
              <dt>Skins</dt>
              <dd v-for="item in skinList" :key="item.name">
                <el-radio v-model="skin" :label="item.name" @change="skinChangeHandle">
                  <span class="t-capitalize">{{ item.name }}</span> {{ item.remark }}
                </el-radio>
              </dd>
            </dl>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
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
        { name: 'yellow'   , color: '#FCB900', remark: '黄色' }
      ]
    };
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
</script>
