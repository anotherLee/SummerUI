<template>
  <div class="s-tabs">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 's-tabs',
    props: {
      selected: {
        type: String,
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) >= 0
        }
      }
    },
    data() {
      return {
        eventBus: new Vue()
      }
    },
    provide() {
      return {
        eventBus: this.eventBus
      }
    },
    created() {
      this.$emit('update:selected')
    },
    mounted() {
      if (this.$children.length === 0) {
        throw new Error('Component Tabs \' children components should be TabsHead or TabsBody!')
      }
      this.$children.forEach(vm => {
        if (vm.$options.name === 's-tabs-head') {
          vm.$children.forEach(item => {
            if (item.$options.name === 's-tabs-item' && item.name === this.selected) {
              this.eventBus.$emit('update:selected', this.selected, item)
            }
          })
        }
      })
    }
  }
</script>

<style lang="scss">

</style>
