<template>
  <div class="row" :style="{ margin: `0 -${parseInt(gutter)/2}px` }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      gutter: [Number, String]
    },
    mounted() {
      this.$children.forEach(vm => {
        vm.gutter = this.gutter
      })
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
  }
</style>
