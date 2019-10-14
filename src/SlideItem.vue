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
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        // visible: false,
        selected: undefined
      }
    },
    computed: {
      visible() {
        return this.selected === this.name
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-slide-item {
    width: 300px; height: 200px;
    border: 1px solid red;
  }
  .slide-leave-active {
    position: absolute; left: 0; top: 0;
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
