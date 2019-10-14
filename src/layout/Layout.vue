<template>
  <div class="s-layout" :class="hasSiderClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-layout',
    data () {
      return {
        hasSiderClass: {
          hasSider: false
        }
      }
    },
    mounted() {
      this.$children.forEach(vm => {
        if (vm.$options.name === 's-sider') {
          this.hasSiderClass = { hasSider: true }
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .s-layout {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    &.hasSider {
      flex-direction: row;
    }
  }
</style>
