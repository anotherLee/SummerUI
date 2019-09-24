<template>
  <div class="s-tabs-item" @click="xxx">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-tabs-item',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: true
      }
    },
    inject: ['eventBus'],
    created() {
      this.eventBus.$on('update:selected', (name) => {
        console.log(name)
      })
    },
    methods: {
      xxx() {
        this.eventBus.$emit('update:selected', this.name)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
