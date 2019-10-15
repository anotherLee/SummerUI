<template>
  <div class="s-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-nav',
    props: {
      selected: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.updateChildren()
      this.listenToChilren()
    },
    updated() {
      this.updateChildren()
    },
    computed: {
      items() {
        return this.$children.filter(vm => vm.$options.name === 's-nav-item')
      }
    },
    methods: {
      /*
       * 判断selected数组里有没有nav-item的name,并设置是否选中
       */
      updateChildren() {
        this.items.forEach(vm => {
          vm.selected = this.selected.indexOf(vm.name) >= 0;
        })
      },
      
      /*
       * 监听nav-item
       */
      listenToChilren() {
        this.items.forEach(vm => {
          vm.$on('add:selected', (name) => {
            if (this.selected.indexOf(name) === -1) {
              if (this.multiple) {
                const copy = JSON.parse(JSON.stringify(this.selected))
                copy.push(name)
                this.$emit('update:selected', copy)
              } else {
                this.$emit('update:selected', [name])
              }
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-nav {
    display: flex;
    border: 1px solid red;
  }
</style>
