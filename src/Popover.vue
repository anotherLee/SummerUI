<template>
  <div class="s-popover" @click.stop="clickPopover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
      <slot></slot>
    </span>
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
          this.$nextTick(() => {
            document.addEventListener('click', handler)
            let { contentWrapper, triggerWrapper } = this.$refs
            let { width, height, left, top } = triggerWrapper.getBoundingClientRect()
            document.body.appendChild(contentWrapper)
            contentWrapper.style.left = `${left + window.scrollX}px`
            contentWrapper.style.top = `${top + window.scrollY}px`
          })
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .s-popover {
    display: inline-block;
    position: relative;
  }
  
  .content-wrapper {
    position: absolute;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    transform: translateY(-100%);
  }
</style>
