<template>
  <div class="s-sticky-wrapper" ref="wrapper">
    <div class="s-sticky-inner" :class="classes">
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
      }
    },
    computed: {
      classes() {
        return { sticky: this.sticky }
      }
    },
    mounted() {
      let { top, height } = this.topAndHeight()
      this.$refs.wrapper.style.height = `${height}px`
      window.addEventListener('scroll', () => {
        if (window.scrollY > top) {
          this.sticky = true
        } else {
          this.sticky = false
        }
      })
    },
    methods: {
      /*
       * 获取wrapper高度及距离文档顶部高度
       */
      topAndHeight() {
        const { top, height } = this.$refs.wrapper.getBoundingClientRect()
        return { top: top + window.scrollY, height }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-sticky-wrapper {
    .s-sticky-inner {
      &.sticky {
        position: fixed; top: 0; left: 0;
        width: 100%;
      }
    }
  }
</style>
