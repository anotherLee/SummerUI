<template>
  <button class="s-button">按钮</button>
</template>

<script>
  export default {}
</script>

<style lang="scss" type="text/scss">
  .s-button {
    height: var(--button-height);
    padding: 0 1em;
    font-size: var(--font-size);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background-color: var(--button-bg);
    
    &:hover {
      border-color: var(--border-color-hover);
      cursor: var(--button-cursor-hover);
    }
  
    &:active {
      background-color: var(--button-active-bg);
    }
  
    &:focus {
      outline: none;
    }
  }
</style>
