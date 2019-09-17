<template>
  <svg v-if="name" class="icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
  /*这里为了和字一样高，所以用em*/
  .icon {
    width: 1em;
    height: 1em;
  }
</style>
