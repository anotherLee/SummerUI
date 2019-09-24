<template>
  <div class="s-tabs-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-tabs-item',
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
