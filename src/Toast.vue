<template>
  <div class="s-toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-toast'
  }
</script>

<style lang="scss" scoped>
  $font-size: 14px;
  $toast-height: 40px;
  $toast-bg: rgba(0,0,0,0.75);
  .s-toast {
    display: flex; align-items: center;
    position: fixed; top: 0; left: 50%; transform: translateX(-50%);
    line-height: 1.8; height: $toast-height;
    padding: 0 1em;
    background-color: $toast-bg;
    font-size: $font-size;border-radius: 3px; color: #fff;
  }
</style>
