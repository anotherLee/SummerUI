<template>
  <div class="s-tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-tabs-pane',
    inject: ['eventBus'],
    props: {
      name: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        active: false
      }
    },
    computed: {
      classes() {
        return {
          active: this.active
        }
      }
    },
    created() {
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name
      })
    },
  }
</script>

<style lang="scss" scoped>
  .s-tabs-pane {
    &.active {
    }
  }
</style>
