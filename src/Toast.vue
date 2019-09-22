<template>
  <div class="wrapper" :class="toastClasses">
    <div class="s-toast" ref="toast">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
      <div class="line" ref="line" v-if="closeButton.text"></div>
      <span class="close" @click="closeCallback" v-if="closeButton.text">
        {{ closeButton.text }}
      </span>
    </div>
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
          text: '',
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
        const { toast, line } = this.$refs
        this.$nextTick(() => {
          line.style.height = toast.offsetHeight + 'px'
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
  @keyframes slide-down {
    0% { transform: translateY(-100%) }
    100% { transform: translateY(0) }
  }
  @keyframes slide-up {
    0% { transform: translateY(100%) }
    100% { transform: translateY(0) }
  }
  @keyframes fade {
    0% { opacity: 0 }
    100% { opacity: 1 }
  }
  
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  
  .wrapper {
    position: fixed; left: 50%;
    transform: translateX(-50%);
    
    &.position-top {
      top: 0; left: 50%;
      .s-toast {
        animation: slide-down 0.3s linear;
      }
    }
  
    &.position-middle {
      top: 50%; left: 50%;
      transform: translateY(-50%);
      animation: fade 0.3s linear;
      .s-toast {
        transform: translate(-50%, -50%);
      }
    }
  
    &.position-bottom {
      bottom: 0; left: 50%;
      .s-toast {
        animation: slide-up 0.3s linear;
      }
    }
    
    .s-toast {
      display: flex; align-items: center;
      line-height: 1.8; min-height: $toast-min-height;
      padding: 0 1em;
      background-color: $toast-bg; font-size: $font-size;border-radius: 3px; color: #fff;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
    
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
  }
</style>
