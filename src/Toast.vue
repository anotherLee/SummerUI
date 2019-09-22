<template>
  <div class="s-toast" ref="wrapper" :class="toastClasses">
    <slot v-if="!enableHtml"></slot>
    <div v-else v-html="$slots.default[0]"></div>
    <div class="line" ref="line"></div>
    <span class="close" v-if="closeButton && closeButton.text" @click="closeCallback">
      {{ closeButton.text }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 's-toast',
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 60
      },
      closeButton: {
        type: Object,
        default: () => ({
          text: '关闭',
          callback: undefined
        })
      },
      enableHtml: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'middle'].indexOf(value) >= 0
        }
      }
    },
    computed: {
      toastClasses() {
        return {
          [`position-${this.position}`]: true
        }
      }
    },
    mounted() {
      this.executeAutoClose()
      this.setLineHeight()
    },
    methods: {
      executeAutoClose() {
        if (this.autoClose) {
          window.setTimeout(() => {
            this.close()
          }, this.autoCloseDelay * 1000)
        }
      },
      setLineHeight() {
        const { wrapper, line } = this.$refs
        this.$nextTick(() => {
          line.style.height = wrapper.offsetHeight + 'px'
        })
      },
      close() {
        this.$el.remove()
        this.$emit('destroy')
        this.$destroy()
      },
      closeCallback() {
        let { callback } = this.closeButton
        if (callback && typeof callback === 'function') {
          this.closeButton.callback()
        }
        this.close()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  .s-toast {
    display: flex; align-items: center;
    position: fixed;
    line-height: 1.8; min-height: $toast-min-height;
    padding: 0 1em;
    background-color: $toast-bg; font-size: $font-size;border-radius: 3px; color: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
    
    &.position-top {
      top: 0; left: 50%;
      transform: translateX(-50%);
    }
    
    &.position-middle {
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }
    
    &.position-bottom {
      bottom: 0; left: 50%;
      transform: translateX(-50%);
    }
    
    .line {
      margin: 0 1em;
      border-left: 1px solid #666;
    }
    
    > .close {
      flex-shrink: 0;
      height: 100%;
      position: relative;
      cursor: pointer;
    }
  }
</style>
