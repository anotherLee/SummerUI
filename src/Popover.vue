<template>
  <div class="s-popover" @click.stop="clickPopover">
    <div class="content-wrapper" v-if="visible" @click.stop>
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
        if (this.visible) {
          let handler = () => {
            this.visible = false
            document.removeEventListener('click', handler)
          }
          document.addEventListener('click', handler)
        }
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
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    }
  }
</style>
