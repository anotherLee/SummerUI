<template>
  <div class="s-nav-sub">
    <span class="nav-sub-title" @click="onClick">
      <slot name="title"></slot>
    </span>
    <div class="nav-sub-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-nav-sub',
    data() {
      return {
        open: false
      }
    },
    methods: {
      onClick() {
        this.open = !this.open
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  .s-nav-sub {
    position: relative;
    .nav-sub-title {
      display: inline-block;
      vertical-align: middle;
      padding: 10px 20px;
      cursor: pointer;
    }
    .nav-sub-popover {
      position: absolute; left: 0; top: 100%;
      margin-top: 3px;
      white-space: nowrap;
      min-width: 6em;
      background-color: #fff;
      color: $light-color;
      font-size: $font-size;
      box-shadow: 0 0 3px $box-shadow-color;
      border-radius: $border-radius;
    }
  }
  .s-nav-sub .s-nav-sub .nav-sub-popover {
    top: 0; left: 100%; margin-left: 5px;
  }
</style>
