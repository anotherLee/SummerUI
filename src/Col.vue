<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-col',
    props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      }
    },
    computed: {
      colClass() {
        const { span, offset } = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`
        ]
      },
      colStyle() {
        return {
          padding: `0 ${parseInt(this.gutter) / 2}px`
        }
      }
    },
    data() {
      return {
        gutter: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col {
    /*padding: 0 10px;*/
    height: 50px; width: 100%;
    
    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: $n / 24 * 100%;
      }
    }
    
    $class-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: $n / 24 * 100%;
      }
    }
  }
</style>
