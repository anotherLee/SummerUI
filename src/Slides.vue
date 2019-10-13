<template>
  <div class="s-slides">
    <div class="s-slides-window"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-slides',
    mounted() {
      const [first, second] = this.$children
      first.visible = true
      setTimeout(() => {
        first.visible = false
        second.visible = true
      }, 3000)
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .s-slides {
    position: relative;
    width: 300px; height: 200px;
    &-window {
    
    }
  }
</style>
