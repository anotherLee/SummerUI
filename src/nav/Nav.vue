<template>
  <div class="s-nav" :class="{vertical}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-nav',
    props: {
      selected: {
        type: String,
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        items: [],
        namePath: []
      }
    },
    provide() {
      return {
        root: this
      }
    },
    mounted() {
      this.updateChildren()
      this.listenToChilren()
    },
    updated() {
      this.updateChildren()
    },
    methods: {
      addItems(vm) {
        this.items.push(vm)
      },
      /*
       * 判断selected数组里有没有nav-item的name,并设置是否选中
       */
      updateChildren() {
        this.items.forEach(vm => {
          vm.selected = this.selected === vm.name
        })
      },

      /*
       * 监听nav-item
       */
      listenToChilren() {
        this.items.forEach(vm => {
          vm.$on('update:selected', (name) => {
            this.$emit('update:selected', name)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  .s-nav {
    display: flex;
    border-bottom: 1px solid $grey;
    
    &.vertical {
      flex-direction: column;
      border: 1px solid $grey;
    }
  }
</style>
