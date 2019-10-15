<template>
  <div class="s-nav-item" :class="{ active: selected }" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-nav-item',
    inject: ['root'],
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
    created() {
      this.root.addItems(this)
    },
    methods: {
      onClick() {
        this.root.namePath = []
        this.$parent.updateNamePath && this.$parent.updateNamePath()
        this.$emit('add:selected', this.name)
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  .s-nav-item {
    position: relative;
    padding: 10px 20px;
    cursor: pointer;
    &.active {
      &::after {
        content: '';
        display: block;
        width: 100%;
        position: absolute; left: 0; bottom: 0;
        border-bottom: 2px solid $blue;
      }
    }
  }
  
  .s-nav-sub .s-nav-item {
    &.active {
      background-color: $grey;
      color: $color;
      &::after {
        display: none;
      }
    }
  }
</style>
