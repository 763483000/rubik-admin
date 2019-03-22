<template>
  <div
    ref="raWrapper"
    class="ra-layout"
    :class="[
      'ra-header--' + $store.state.headerSkin,
      'ra-aside--' + $store.state.asideSkin,
      {
        'ra-wrapper--center': $store.state.wrapperCenter,
        'ra-header--fixed': $store.state.headerFixed,
        'ra-aside--fixed': $store.state.asideFixed,
        'ra-aside--fold': $store.state.asideFold,
        'ra-aside--top': $store.state.asideTop,
        'ra-control--fixed': $store.state.controlFixed,
        'ra-control--open': $store.state.controlOpen,
        'ra-main-tabs__header--fixed': $store.state.mainTabsHeaderFixed
      }
    ]"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading">
      <north />
      <west />
      <east />
      <center />
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
  name: 'main',
  data () {
    return {
      loading: true
    }
  },
  components: {
    North,
    West,
    Center,
    East,
    South
  },
  created () {
    window.setTimeout(() => {
      this.loading = false
    }, 300)
  },
};
</script>
