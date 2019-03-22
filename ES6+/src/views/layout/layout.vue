<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    class="ra-layout">
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
