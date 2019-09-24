<template>
  <div class="s-tabs-header">
    <slot></slot>
    <slot name="actions"></slot>
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

</style>
