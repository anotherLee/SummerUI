<template>
  <div class="s-slides">
    <div class="s-slides-window"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-slides',
    props: {
      selected: {
        type: String
      }
    },

    mounted() {
      this.updateChildren()
    },

    /*
     * 当props或者data更新后都会触发
     */
    updated() {
      this.updateChildren()
    },
    methods: {
      updateChildren() {
        let [first] = this.$children
        this.$children.forEach(vm => {
          vm.selected = this.selected || first.name
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  
  .s-slides {
    position: relative;
    
    &-window {
    
    }
  }
</style>
