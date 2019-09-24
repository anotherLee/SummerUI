<template>
  <div class="s-tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-tabs-head',
    inject: ['eventBus'],
    mounted() {
      this.eventBus.$on('update:selected', (name, vm) => {
        const { offsetLeft: left, offsetWidth: width } = vm.$el
        const { line } = this.$refs
        line.style.width = width + 'px'
        line.style.left = `${left}px`
      })
    }
  }
</script>

<style lang="scss" scoped>
  $tab-height: 40px;
  $blue: blue;
  .s-tabs-head {
    display: flex;
    justify-content: flex-start;
    position: relative;
    height: $tab-height;
    border: 1px solid red;
    .line {
      position: absolute;bottom: 0;
      border-bottom: 2px solid $blue;
      transition: all 0.25s linear;
    }
    >.actions-wrapper {
      margin-left: auto;
    }
  }
</style>
