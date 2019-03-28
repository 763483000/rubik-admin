<template>
  <div
    ref="raWrapper"
    v-loading.fullscreen.lock="loading"
    element-loading-text="加载中..."
    class="ra-layout"
    :class="[
      'ra-north--' + $store.state.headerSkin,
      'ra-west--' + $store.state.asideSkin,
      {
        'ra-layout--center': $store.state.wrapperCenter,
        'ra-north--fixed': $store.state.headerFixed,
        'ra-west--fixed': $store.state.asideFixed,
        'ra-west--fold': $store.state.westFlod,
        'ra-west--top': $store.state.asideTop,
        'ra-east--fixed': $store.state.controlFixed,
        'ra-east--open': $store.state.controlOpen,
        'ra-center-tabs__header--fixed': $store.state.mainTabsHeaderFixed
      }
    ]">
    <template v-if="!loading">
      <north />
      <west />
      <center />
      <east />
      <south />
    </template>
  </div>
</template>

<script>
import North from './north.vue';
import West from './west.vue';
import Center from './center.vue';
import East from './east.vue';
import South from './south.vue';

export default {
  data() {
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
  created() {
    window.setTimeout(() => {
      this.loading = false;
    }, 300);
  },
};
</script>
