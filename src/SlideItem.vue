<template>
  <transition name="slide">
    <div class="s-slide-item" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 's-slide-item',
    data() {
      return {
        visible: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-slide-item {
    position: absolute; left: 0; top: 0;
    width: 100%; height: 100%;
    border: 1px solid red;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 1s;
  }
  .slide-enter {
    transform: translateX(100%);
  }
  .slide-leave-to {
    transform: translateX(-100%);
  }
</style>
