<template>
  <div class="row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      gutter: [Number, String]
    },
    computed: {
      rowStyle() {
        return {
          margin: `0 -${parseInt(this.gutter) / 2}px`
        }
      }
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
