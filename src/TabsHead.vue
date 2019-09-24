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
    created() {
      this.eventBus.$on('update:selected', (name, vm) => {
        console.log(name)
        console.log(vm)
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
      border-bottom: 1px solid $blue;
      width: 100px;
    }
    >.actions-wrapper {
      margin-left: auto;
    }
  }
</style>
