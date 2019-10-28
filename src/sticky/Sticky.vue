<template>
  <div class="s-sticky-wrapper" ref="wrapper" :style="{height}">
    <div class="s-sticky-inner" :class="classes" :style="{ height, width, left, top }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-sticky',
    props: {
      distance: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        sticky: false, // 是否要sticky
        left: undefined, // wrapper fixed 定位后的 left
        top: undefined, // wrapper fixed 定位后的 top
        width: undefined, // wrapper 的宽度
        height: undefined, // wrapper 的高度
        handler: undefined, // window 的 scroll 事件的回调
      }
    },
    computed: {
      classes() {
        return { sticky: this.sticky }
      }
    },
    mounted() {
      let top = this.getTop()
      this.handler = () => {
        if (window.scrollY > top - this.distance) {
          const { left, height, width } = this.$refs.wrapper.getBoundingClientRect()
          this.left = left + 'px'
          this.top = this.distance + 'px'
          this.height = height + 'px'
          this.width = width + 'px'
          this.sticky = true
        } else {
          this.left = undefined
          this.top = undefined
          this.height = undefined
          this.width = undefined
          this.sticky = false
        }
      }
      window.addEventListener('scroll', this.handler)
    },
    methods: {
      /*
       * 获取wrapper距离文档顶部高度
       */
      getTop() {
        const { top } = this.$refs.wrapper.getBoundingClientRect()
        return top + window.scrollY
      },
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handler)
    }
  }
</script>

<style lang="scss" scoped>
  .s-sticky-wrapper {
    .s-sticky-inner {
      &.sticky {
        position: fixed;
      }
    }
  }
</style>
