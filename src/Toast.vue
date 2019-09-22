<template>
  <div class="s-toast">
    <slot></slot>
    <span class="close" v-if="closeButton && closeButton.text" @click="closeCallback()">
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
          callback: function() {
            this.close()
          }
        })
      }
    },
    mounted() {
      if (this.autoClose) {
        window.setTimeout(() => {
          this.close()
        }, this.autoCloseDelay * 1000)
      }
    },
    methods: {
      close() {
        this.$el.remove()
        this.$destroy()
      },
      closeCallback() {
        this.closeButton.callback()
        this.close()
      }
    }
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
    background-color: $toast-bg; font-size: $font-size;border-radius: 3px; color: #fff;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.5);
    >.close {
      display: flex; align-items: center;
      height: 100%; padding-left: 2em;
      position: relative;
      cursor: pointer;
      &:after {
        content: '';
        position: absolute; left: 1em; top: 0;
        height: 100%; width: 0;
        border-left: 1px solid #666;
      }
    }
  }
</style>
