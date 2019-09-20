<template>
  <div class="row" :class="rowClass" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      gutter: [Number, String],
      align: {
        type: String,
        default: 'left',
        validator(value) {
          return ['left', 'right', 'center'].indexOf(value) !== -1
        }
      }
    },
    computed: {
      rowStyle() {
        return {
          margin: `0 -${parseInt(this.gutter) / 2}px`
        }
      },
      rowClass() {
        const { align } = this
        return {
          [align && `align-${align}`]: true
        }
      }
    },
    mounted() {
      this.$children.forEach(vm => {
        vm.gutter = this.gutter
      })
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    &.align-left {
      justify-content: flex-start;
    }
    &.align-right {
      justify-content: flex-end;
    }
    &.align-center {
      justify-content: center;
    }
  }
</style>
