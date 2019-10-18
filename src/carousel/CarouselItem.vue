<template>
  <div class="s-carousel-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-carousel-item',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .s-carousel-item {
    position: absolute; left: 0; top: 0;
    z-index: 1;
    height: 100%; width: 100%;
  }
</style>
