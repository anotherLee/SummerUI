<template>
  <div class="s-tabs-item" @click="select" :class="classes">
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
    inject: ['eventBus'],
    created() {
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name
      })
    },
    methods: {
      select() {
        this.eventBus.$emit('update:selected', this.name, this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $blue: blue;
  .s-tabs-item {
    display: flex; align-items: center;
    height: 100%;
    flex-shrink: 0;
    padding: 0 1em;
    &.active {
      color: $blue;
    }
    cursor: pointer;
  }
</style>
