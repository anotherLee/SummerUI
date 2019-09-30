<template>
  <div class="s-cascader">
    <div class="trigger" @click="switchPopover">
      {{ result }}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
              :source-items="source"
              :height="popoverHeight"
              :level="level"
              :selected="selected"
              @item-selected="onUpdateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import CascaderItems from "./CascaderItems"

  export default {
    name: 's-cascader',
    props: {
      source: {
        type: Array
      },
      popoverHeight: {
        type: String
      },
      level: {
        type: Number,
        default: 0
      },
      selected: {
        type: Array
      },
      loadData: {
        type: Function
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    },
    computed: {
      result() {
        return this.selected.map(item => item.name).join('/')
      }
    },
    mounted() {
    },
    methods: {
      switchPopover() {
        this.popoverVisible = !this.popoverVisible
      },
      onUpdateSelected(newSelected) {
        this.$emit('item-selected', newSelected)
        const lastItem = newSelected[newSelected.length - 1]
        const callback = (result) => {
          // 找到被点击的那个，把result放到children里面
          this.$set(lastItem, 'children', result)
        }
        this.loadData(lastItem, callback)
      },
    },
    components: {
      CascaderItems
    }
  }
</script>

<style lang="scss" scoped>
  @import 'var';
  
  .s-cascader {
    position: relative;
    
    .trigger {
      display: inline-flex; align-items: center;
      vertical-align: top;
      height: $input-height;min-width: 10em;
      padding: 0 0.5em;
      border: 1px solid $border-color; border-radius: $border-radius;
      cursor: pointer;
    }
    
    .popover-wrapper {
      position: absolute; top: 100%; left: 0;
      margin-top: 3px;
      background-color: #fff;
      border-radius: $border-radius;
      @extend .box-shadow;
    }
  }
</style>
