/*
* 1. 使用slot来传文本
*/
<template>
  <button class="s-button" :class="{[`icon-${iconPosition}`]: true}">
<!--    <svg v-if="icon" class="icon">-->
<!--      <use :xlink:href="`#i-${icon}`"></use>-->
<!--    </svg>-->
    <s-icon :name="icon"></s-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: ''
      },
      iconPosition: {
        type: String,
        default: 'left',
        validator: function (value) {
          return value === 'left' || value === 'right'
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .s-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
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
    
    &.icon-left {
      .icon {
        order: 1;
        margin-right: 0.3em;
      }
      
      .content {
        order: 2
      }
    }
    
    &.icon-right {
      .icon {
        order: 2;
        margin-left: 0.3em;
      }
      .content {
        order: 1;
      }
    }
  }
</style>
