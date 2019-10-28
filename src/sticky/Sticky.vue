<template>
  <div class="s-sticky-wrapper" ref="wrapper" :style="{height}">
    <div class="s-sticky-inner" :class="classes" :style="{ height, width, left }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-sticky',
    data() {
      return {
        sticky: false, // 是否要sticky
        left: undefined, // wrapper fixed 定位后的left
        width: undefined, // wrapper 的宽度
        height: undefined, // wrapper 的高度
      }
    },
    computed: {
      classes() {
        return { sticky: this.sticky }
      }
    },
    mounted() {
      let top = this.top()
      window.addEventListener('scroll', () => {
        console.log(window.scrollY, top)
        if (window.scrollY > top) {
          const { left, height, width } = this.$refs.wrapper.getBoundingClientRect()
          this.left = left + 'px'
          this.height = height + 'px'
          this.width = width + 'px'
          this.sticky = true
        } else {
          this.sticky = false
        }
      })
    },
    methods: {
      /*
       * 获取wrapper距离文档顶部高度
       */
      top() {
        const { top } = this.$refs.wrapper.getBoundingClientRect()
        return top + window.scrollY
      },
    }
  }
</script>

<style lang="scss" scoped>
  .s-sticky-wrapper {
    .s-sticky-inner {
      &.sticky {
        position: fixed; top: 0; left: 0;
      }
    }
  }
</style>
