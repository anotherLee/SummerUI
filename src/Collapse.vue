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
      }
    },
    provide() {
      if (this.single) {
        return {
          eventBus: this.eventBus
        }
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
