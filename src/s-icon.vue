<template>
  <svg v-if="name" class="icon" :class="{ rotate: name === 'loading' }">
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
  @keyframes spin {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
  /*这里为了和字一样高，所以用em*/
  .icon {
    width: 1em;
    height: 1em;
  }
  
  .icon.rotate {
    animation: spin 1.2s infinite linear;
  }
</style>
