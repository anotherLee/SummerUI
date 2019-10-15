<template>
  <div class="s-nav-sub">
    <span class="nav-sub-title">
      <slot name="title"></slot>
    </span>
    <div class="nav-sub-popover">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-nav-sub'
  }
</script>

<style lang="scss" scoped>
  .s-nav-sub {
    position: relative;
    .nav-sub-title {
      display: inline-block;
      padding: 10px 20px;
    }
    .nav-sub-popover {
      position: absolute; left: 0; top: 100%;
      white-space: nowrap;
      border: 1px solid #000;
    }
  }
</style>
