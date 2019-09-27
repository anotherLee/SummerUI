/*
* 1. 使用slot来传文本
*/
<template>
  <button class="s-button"
          :class="{[`icon-${iconPosition}`]: true, noSlots: !hasSlots}"
          @click="$emit('click')">
    <s-icon :name="icon" v-if="!loading"></s-icon>
    <s-icon class="rotate" name="loading" v-if="loading"></s-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 's-button',
    props: {
      icon: {
        type: String,
        default: ''
      },
      iconPosition: {
        type: String,
        default: 'left',
        validator: function (value) {
          return ['left', 'right'].indexOf(value) !== -1
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    // 如果按钮只有图标没有文字那就不要文字和图标之间的margin空隙
    computed: {
      hasSlots() {
        let defaultValue = this.$slots.default
        return defaultValue && defaultValue.length
      }
    },
    components: {
      'SIcon': Icon
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  $button-height: 32px;
  $button-bg: white;
  $button-active-bg: #eee;
  $font-size: 14px;
  $color: #333;
  $border-radius: 4px;
  $border-color: #999;
  $border-color-hover: #666;
  $button-cursor-hover: pointer;
  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  
  .s-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: $button-height;
    padding: 0 1em;
    font-size: $font-size;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background-color: $button-bg;
    
    &:hover {
      border-color: $border-color-hover;
      cursor: $button-cursor-hover;
    }
    
    &:active {
      background-color: $button-active-bg;
    }
    
    &:focus {
      outline: none;
    }
    
    &.icon-left {
      .icon {order: 1;margin-right: 0.3em;}
      
      .content {order: 2;}
    }
    
    &.icon-right {
      .icon {order: 2;margin-left: 0.3em;}
      
      .content {order: 1;}
    }
    
    &.icon-left.noSlots {
      .icon {margin-right: 0;}
    }
    
    &.icon-right.noSlots {
      .icon {margin-left: 0;}
    }
    
    .icon.rotate {
      animation: spin 1.2s infinite linear;
    }
  }
</style>
