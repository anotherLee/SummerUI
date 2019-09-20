<template>
  <div class="col" :class="[span && `col-${span}`, offset && `offset-${offset}`]" :style="{padding: `0 ${parseInt(gutter)/2}px`}">
    <div style="border: 1px solid green;">
      <slot></slot>
    </div>
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
