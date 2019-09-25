<template>
  <div class="s-popover" @click="clickPopover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
      clickPopover(e) {
        let { triggerWrapper } = this.$refs
        if (triggerWrapper.contains(e.target)) {
          this.visible = !this.visible
          if (this.visible) {
            this.$nextTick(() => {
              this.listenDocument()
              this.positionContent()
            })
          }
        }
      },
      
      /*
       * 监听document来控制content的显示隐藏
       */
      listenDocument() {
        let { contentWrapper, triggerWrapper } = this.$refs
        let handler = (e) => {
          if (contentWrapper.contains(e.target) || triggerWrapper.contains(e.target)) return
          this.visible = false
          document.removeEventListener('click', handler)
        }
        document.addEventListener('click', handler)
      },
      
      /*
       * 定位content
       */
      positionContent() {
        let { contentWrapper, triggerWrapper } = this.$refs
        document.body.appendChild(contentWrapper)
        let { width, height, left, top } = triggerWrapper.getBoundingClientRect()
        contentWrapper.style.left = `${left + window.scrollX}px`
        contentWrapper.style.top = `${top + window.scrollY}px`
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
