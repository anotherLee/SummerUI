<template>
  <div class="s-nav-item" :class="{ active: selected }" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-nav-item',
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selected: false
      }
    },
    inject: ['root'],
    created() {
      this.root.addItems(this)
    },
    methods: {
      onClick() {
        this.$emit('add:selected', this.name)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-nav-item {
    padding: 10px 20px;
    cursor: pointer;
    &.active {
      background-color: red;
    }
  }
</style>
