<template>
  <div class="s-slides">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-slides',
    mounted() {
      const first = this.$children[0]
      first.visible = true
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .s-slides {
    position: relative;
    border: 1px solid $border-color;
  }
</style>
