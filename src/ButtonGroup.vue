<template>
  <div class="s-button-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 's-group-button',
    mounted() {
      let children = this.$el.children
      for (let node of children) {
        let currentNode = node.nodeName.toLowerCase()
        if (currentNode !== 'button') {
          console.warn(`You need use a s-button as slots in s-button-group, now you are using a ${currentNode}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .s-button-group {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    
    > .s-button {
      border-radius: 0;
      
      &:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      
      &:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
      
      &:not(:first-child) {
        margin-left: -1px;
      }
      
      /* hover的时候要让它上去 */
      &:hover {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>
