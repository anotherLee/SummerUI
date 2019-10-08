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
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 1s;
  }
  .slider-enter {
  
  }
  .slider-leave-to {
  
  }
</style>
