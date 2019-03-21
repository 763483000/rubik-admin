<template>
  <div
    ref="raWrapper"
    class="ra-wrapper"
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
      <layout-north></layout-north>
      <layout-west></layout-west>
      <layout-east></layout-east>
      <layout-center></layout-center>
      <layout-south></layout-south>
    </template>
  </div>
</template>

<script>
import LayoutNorth from './layout-north.vue'
import LayoutWest from './layout-west.vue'
import LayoutCenter from './layout-center.vue'
import LayoutEast from './layout-east.vue'
import LayoutSouth from './layout-south.vue'
export default {
  name: 'main',
  data () {
    return {
      loading: true
    }
  },
  components: {
    LayoutNorth,
    LayoutWest,
    LayoutCenter,
    LayoutEast,
    LayoutSouth
  },
  created () {
    this.loading = false
  }
}
</script>
