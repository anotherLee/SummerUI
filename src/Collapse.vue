<template>
  <div class="s-collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-collapse'
  }
</script>

<style lang="scss" scoped>
  $grey: #ddd;
  $border-radius: 4px;
  .s-collapse {
    border: 1px solid $grey;
    border-radius: $border-radius;
  }
</style>
