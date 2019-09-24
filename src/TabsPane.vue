<template>
  <div class="s-tabs-pane">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-tabs-pane',
    inject: ['eventBus'],
    created() {
      this.eventBus.$on('update:selected', (name) => {
        console.log(name)
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>
