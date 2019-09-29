<template>
  <div class="s-cascader-item" :style="{ height: height }">
    <div class="left">
      <div class="label" v-for="item in sourceItems" @click="leftSelected = item">
        {{ item.name }}
        <Icon v-if="item.children" name="right"></Icon>
      </div>
    </div>
    
    <div class="right" v-if="rightItems">
      <s-cascader-items :source-items="rightItems" :height="height"></s-cascader-items>
    </div>
  </div>
</template>

<script>
  import Icon from "./Icon"
  export default {
    name: 's-cascader-items',
    props: {
      sourceItems: {
        type: Array
      },
      height: {
        type: String
      }
    },
    data() {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems() {
        if (this.leftSelected && this.leftSelected.children) {
          return this.leftSelected.children
        }
        return null
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  .s-cascader-item {
    display: flex;
    height: 100px;
    .left {
      padding: 0.3em 0;
      height: 100%;
      .label {
        display: flex; align-items: center;
        padding: 0.3em 1em;
        cursor: pointer;
        .icon {
          margin-left: 0.5em;
          width: 0.8em;
        }
      }
    }
    .right {
      height: 100%;
      margin-top: -1px;
      border-left: 1px solid $border-color-light;
    }
  }
</style>
