/*
* 1. 使用slot来传文本
*/
<template>
  <button class="s-button" :class="{[`icon-${iconPosition}`]: true}" @click="$emit('click')">
    <s-icon :name="icon" v-if="!loading"></s-icon>
    <s-icon class="rotate" name="loading" v-if="loading"></s-icon>
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
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  @keyframes spin {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
  
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
    
    .icon.rotate {
      animation: spin 1.2s infinite linear;
    }
  }
</style>
