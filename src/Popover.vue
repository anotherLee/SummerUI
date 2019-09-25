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
        if (this.$refs.triggerWrapper.contains(e.target)) {
          if (this.visible) {
            this.close()
          } else {
            this.open()
          }
        }
      },
      
      /*
       * 显示pop
       */
      open() {
        this.visible = true
        this.$nextTick(() => {
          document.addEventListener('click', this.onClickHandler)
          this.positionContent()
        })
      },

      /*
       * 关闭pop
       */
      close() {
        this.visible = false
        document.removeEventListener('click', this.onClickHandler)
      },
      
      onClickHandler(e) {
        const { contentWrapper, triggerWrapper } = this.$refs
        if (contentWrapper && contentWrapper.contains(e.target) || triggerWrapper.contains(e.target)) return
        this.visible = false
        document.removeEventListener('click', this.onClickHandler)
      },
      
      /*
       * 定位content
       */
      positionContent() {
        let { contentWrapper, triggerWrapper } = this.$refs
        document.body.appendChild(contentWrapper)
        let { left, top } = triggerWrapper.getBoundingClientRect()
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
