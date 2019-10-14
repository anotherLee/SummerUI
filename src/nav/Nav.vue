<template>
  <div class="s-nav"></div>
</template>

<script>
  export default {
    name: 's-nav',
    props: {
      selected: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
