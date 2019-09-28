<template>
  <div class="s-cascader-item">
    <div class="left">
      <div v-for="item in sourceItems" @click="leftSelected = item">{{ item.name }}</div>
    </div>
    
    <div class="right" v-if="rightItems">
      <s-cascader-items :source-items="rightItems"></s-cascader-items>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-cascader-items',
    props: {
      sourceItems: {
        type: Array
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
    }
  }
</script>

<style lang="scss" scoped>
  .s-cascader-item {
    display: flex;
    padding-left: 10px;
    border: 1px solid red;
    .right {
      margin-top: -1px;
    }
  }
</style>
