<template>
  <div class="s-collapse">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 's-collapse',
    data() {
      return {
        eventBus: new Vue()
      }
    },
    props: {
      single: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Array
      }
    },
    provide() {
      return {
        eventBus: this.eventBus
      }
    },
    mounted() {
      // 通知儿子
      this.eventBus.$emit('selected', this.selected)
      // 监听儿子的变化
      this.eventBus.$on('removeSelected', name => {
        const copySelected = JSON.parse(JSON.stringify(this.selected))
        const index = this.selected.indexOf(name)
        copySelected.splice(index, 1)
        this.notifyParentAndChildren(copySelected)
      })

      this.eventBus.$on('addSelected', name => {
        let copySelected = JSON.parse(JSON.stringify(this.selected))
        if (this.single) {
          copySelected = [name]
        } else {
          copySelected.push(name)
        }
        this.notifyParentAndChildren(copySelected)
      })
    },
    methods: {
      notifyParentAndChildren(copySelected) {
        this.$emit('update:selected', copySelected)
        this.eventBus.$emit('selected', copySelected)
      }
    }
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
