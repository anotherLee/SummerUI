<template>
  <div class="col" :class="[`col-${span}`]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-col',
    props: {
      span: {
        type: [Number, String]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col {
    height: 50px;
    width: 50%;
    border: 1px solid red;
    background-color: grey;
    
    $class: col-;
    @for $n from 1 through 24 {
      &.#{$class}#{$n} {
        width: $n / 24 * 100%;
      }
    }
  }
</style>
