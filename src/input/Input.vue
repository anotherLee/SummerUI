<template>
  <div class="wrapper" :class="{error}">
    <input type="text" :value="value" :disabled="disabled" :readonly="readonly"
           @change="$emit('change', $event.target.value)"
           @input="$emit('input', $event.target.value)"
           @focus="$emit('focus', $event.target.value)"
           @blur="$emit('blur', $event.target.value)"
    />
    <template v-if="error">
      <Icon name="error" class="icon-error"></Icon>
      <span class="errorMessage">{{error}}</span>
    </template>
  </div>
</template>

<script>
  import Icon from '../icon/Icon'

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
  @import "../var";
  
  .wrapper {
    display: inline-flex; align-items: center;
    font-size: $font-size;
    
    > :not(:last-child) { margin-right: 0.5em; }
    
    > input {
      height: $input-height;padding: 0 8px;border: 1px solid $border-color;border-radius: 4px;
      
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
