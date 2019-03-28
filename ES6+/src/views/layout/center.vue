<template>
  <main class="ra-center">
    <!-- standard 标准 -->
    <div v-show="$store.state.mainType === 'standard'" class="ra-center__hd">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>renren-ra</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-show="$store.state.mainType === 'standard'" class="ra-center__bd">
      <home></home>
    </div>
    <!-- tabs 标签页 -->
    <el-dropdown v-show="$store.state.mainType === 'tabs'" class="ra-center-tabs__tool">
      <i class="el-icon-arrow-down"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>关闭当前标签页</el-dropdown-item>
        <el-dropdown-item>关闭其它标签页</el-dropdown-item>
        <el-dropdown-item>关闭全部标签页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tabs v-show="$store.state.mainType === 'tabs'" class="ra-center-tabs ra-tabs" v-model="$store.state.mainTabsActive">
      <el-tab-pane label="home" name="home" :closable="false" class="ra-center-tabs__pane--full">
        <svg slot="label" class="ra-content--tabs-icon-nav icon-svg" aria-hidden="true"><use xlink:href="#home"></use></svg>
        <home></home>
      </el-tab-pane>
      <el-tab-pane label="标签页2" name="2" closable>标签页2</el-tab-pane>
      <el-tab-pane label="标签页3" name="3" closable>标签页3</el-tab-pane>
      <el-tab-pane label="标签页5" name="5" closable>
        <span slot="label"><i class="el-icon-date"></i> 标签页5</span>
      </el-tab-pane>
      <el-tab-pane label="标签页6" name="6" closable>标签页6</el-tab-pane>
      <el-tab-pane label="标签页7" name="7" closable>标签页7</el-tab-pane>
      <el-tab-pane label="标签页8" name="8" closable>标签页8</el-tab-pane>
      <el-tab-pane label="标签页9" name="9" closable>标签页9</el-tab-pane>
      <el-tab-pane label="标签页10" name="10" closable>标签页10</el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import Home from '@/views/modules/home.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Home,
  },
};
</script>
