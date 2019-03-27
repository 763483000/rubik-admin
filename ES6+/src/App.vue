<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<script>
import styles from '@/assets/styles/variables.scss';

export default {
  data() {
    return {
      styles: styles
    }
  },
  created() {
    console.log(this.styles, 1111);
  },
};
</script>
