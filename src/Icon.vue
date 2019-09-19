<template>
  <svg v-if="name" class="icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
  import './svg'
  export default {
    name: 's-icon',
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em;
    height: 1em;
  }
</style>
