<template>
  <div class="s-popover" ref="popover">
    <div ref="contentWrapper"
         class="content-wrapper"
         :class="{[`position-${position}`]:true}"
         v-if="visible"
         @mouseenter="mouseEnterContent"
         @mouseleave="mouseLeaveContent">
      <slot name="content" :close="close"></slot>
    </div>
    <span ref="triggerWrapper" class="trigger-wrapper">
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
    mounted() {
      if (this.trigger === 'click') {
        this.$refs.popover.addEventListener('click', this.clickPopover)
      } else {
        this.$refs.popover.addEventListener('mouseenter', this.open)
        this.$refs.popover.addEventListener('mouseleave', this.close)
      }
    },
    props: {
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
        }
      },
      trigger: {
        type: String,
        default: 'click',
        validator(value) {
          return ['click', 'hover'].indexOf(value) >= 0
        }
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
        window.clearTimeout(this.timer)
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
        this.timer = window.setTimeout(() => {
          this.visible = false
        }, this.trigger === 'hover' ? 250 : 0)
        document.removeEventListener('click', this.onClickHandler)
      },

      mouseEnterContent() {
        window.clearTimeout(this.timer)
      },

      mouseLeaveContent() {
        this.trigger === 'hover' && (this.visible = false)
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
        const { contentWrapper, triggerWrapper } = this.$refs
        document.body.appendChild(contentWrapper)
        const { left, top, width, height } = triggerWrapper.getBoundingClientRect()
        const { height: contentHeight, width: contentWidth } = contentWrapper.getBoundingClientRect()
        const positions = {
          top: {
            top: top + window.scrollY,
            left: left - (contentWidth - width) / 2 + window.scrollX,
          },
          bottom: {
            top: top + height + window.scrollY,
            left: left - (contentWidth - width) / 2 + window.scrollX
          },
          left: {
            top: top - (contentHeight - height) / 2 + window.scrollY,
            left: left - contentWidth + window.scrollX,
          },
          right: {
            top: top - (contentHeight - height) / 2 + window.scrollY,
            left: left + width + window.scrollX
          }
        }
        contentWrapper.style.top = positions[this.position].top + 'px'
        contentWrapper.style.left = positions[this.position].left + 'px'
      }
    },
    beforeDestroy() {
      this.$refs.popover.removeEventListener('click', this.clickPopover)
      this.$refs.popover.removeEventListener('mouseenter', this.open)
      this.$refs.popover.removeEventListener('mouseleave', this.close)
    }
  }
</script>

<style lang="scss" scoped>
  $border-color: #333;
  $border-radius: 3px;
  .s-popover {
    display: inline-block;
    position: relative;
    
    .trigger-wrapper {
      display: inline-block;
      position: relative;
    }
  }
  
  .content-wrapper {
    position: absolute;
    max-width: 20em;
    padding: 0.5em 1em;
    word-break: break-all; /* 如果是一个很长的单词，也让它换行 */
    border: 1px solid $border-color;border-radius: $border-radius;
    /*box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);*/
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    background-color: #fff;
    
    &:before, &:after {
      content: '';
      display: block; width: 0; height: 0;
      position: absolute;
      border: 7px solid transparent;
    }
    
    &.position-top {
      transform: translateY(-100%);
      margin-top: -8px; /*这个操作好厉害*/
      
      &:before, &:after {
        left: 50%; top: 100%;
        transform: translateX(-50%);
        border-bottom: none;
      }
      
      &:before {
        border-top-color: black;
      }
      
      &:after {
        top: calc(100% - 1px);
        border-top-color: #fff;
      }
    }
    
    &.position-bottom {
      top: 100%;
      transform: translateY(8px);
      
      &:before, &:after {
        left: 50%; bottom: 100%;
        transform: translateX(-50%);
        border-top: none;
      }
      
      &:before {
        border-bottom-color: black;
      }
      
      &:after {
        bottom: calc(100% - 1px);
        border-bottom-color: #fff;
      }
    }
    
    &.position-left {
      transform: translateX(-8px);
      
      &:before, &:after {
        right: -8px; top: 50%;
        transform: translateY(-50%);
        border-right: none;
      }
      
      &:before {
        border-left-color: black;
      }
      
      &:after {
        right: -7px;
        border-left-color: #fff;
      }
    }
    
    &.position-right {
      transform: translateX(8px);
      
      &:before, &:after {
        left: -8px; top: 50%;
        transform: translateY(-50%);
        border-left: none;
      }
      
      &:before {
        border-right-color: black;
      }
      
      &:after {
        left: -7px;
        border-right-color: #fff;
      }
    }
    
  }
</style>
