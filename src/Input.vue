<template>
  <div class="wrapper" :class="{error}">
    <input type="text" :value="value" :disabled="disabled" :readonly="readonly"/>
    <template v-if="error">
      <Icon name="error" class="icon-error"></Icon>
      <span class="errorMessage">{{error}}</span>
    </template>
  </div>
</template>

<script>
  import Icon from './Icon'

  export default {
    name: 's-input',
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  $height: 32px;
  $border-color: #999;
  $border-color-hover: #666;
  $font-size: 12px;
  $box-shadow-color: rgba(0, 0, 0, 0.5);
  $disabled-color: #aaa;
  $red: #F1453D;
  .wrapper {
    display: inline-flex; align-items: center;
    font-size: $font-size;
    
    > :not(:last-child) { margin-right: 0.5em; }
    
    > input {
      height: 32px;padding: 0 8px;border: 1px solid $border-color;border-radius: 4px;
      
      &:hover {border-color: $border-color-hover;}
      
      &:focus {outline: none;box-shadow: inset 0 0 2px $box-shadow-color;}
      
      &[disabled], &[readonly] {color: $disabled-color; border-color: $disabled-color; cursor: not-allowed;}
    }
    
    &.error {
      > input {border-color: $red;}
    }
    
    .icon-error {fill: $red;}
    
    .errorMessage {color: $red;}
  }
</style>
