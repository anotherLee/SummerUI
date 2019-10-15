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
      white-space: nowrap;
      border: 1px solid #000;
    }
  }
  .s-nav-sub .s-nav-sub .nav-sub-popover {
    top: 0; left: 100%; margin-left: 5px;
  }
</style>
