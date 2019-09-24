<template>
  <div class="s-tabs-head">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-tabs-header',
    inject: ['eventBus'],
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  $tab-height: 40px;
  .s-tabs-head {
    display: flex;
    height: $tab-height;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid red;
    >.actions-wrapper {
      margin-left: auto;
    }
  }
</style>
