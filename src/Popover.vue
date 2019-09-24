<template>
  <div class="s-popover" @click="clickPopover">
    <div class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-popover',
    data() {
      return {
        visible: false
      }
    },
    methods: {
      clickPopover() {
        this.visible = !this.visible
      }
    }

  }
</script>

<style lang="scss" scoped>
  .s-popover {
    display: inline-block;
    position: relative;
    .content-wrapper {
      position: absolute;
      bottom: 100%; left: 0;
      box-shadow: 0 0 2px rgba(0,0,0,0.5);
    }
  }
</style>
