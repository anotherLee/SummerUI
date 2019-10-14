<template>
  <div class="s-cascader-item" :style="{ height: height }">
    <div class="left">
      <div class="label" v-for="item in sourceItems" @click="onItemClick(item)">
        {{ item.name }}
        <Icon v-if="item.children" name="right"></Icon>
      </div>
    </div>
    
    <div class="right" v-if="rightItems">
      <s-cascader-items
        :source-items="rightItems"
        :level="level + 1"
        :height="height"
        :selected="selected"
        @item-selected="captureChildSelect"></s-cascader-items>
    </div>
  </div>
</template>

<script>
  import Icon from "../icon/Icon"

  export default {
    name: 's-cascader-items',
    props: {
      sourceItems: {
        type: Array
      },
      height: {
        type: String
      },
      level: {
        type: Number
      },
      selected: {
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
        if (this.selected[this.level]) {
          if (this.leftSelected && this.leftSelected.children) {
            return this.leftSelected.children
          }
          return null
        }
      }
    },
    methods: {
      onItemClick(item) {
        this.leftSelected = item
        const newSelected = []
        this.$set(newSelected, this.level, item)
        this.$emit('item-selected', newSelected)
      },
      captureChildSelect(newSelected) {
        this.$set(newSelected, this.level, this.leftSelected)
        this.$emit('item-selected', newSelected)
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  .s-cascader-item {
    display: flex;
    height: 100px;
    
    .left {
      padding: 0.3em 0;
      height: 100%;
      overflow: auto;
      .label {
        display: flex; align-items: center;
        padding: 0.3em 1em;
        cursor: pointer;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.06);
        }
        
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
