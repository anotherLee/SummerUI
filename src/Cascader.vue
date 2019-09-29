<template>
  <div class="s-cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
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
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    },
    mounted() {
    },
    methods: {
      onUpdateSelected(newSelected) {
        console.log(1)
        this.$emit('item-selected', newSelected)
      }
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
      border: 1px solid red;
      height: 32px;
      width: 120px;
    }
    .popover-wrapper {
      position: absolute; top: 100%; left: 0;
      background-color: #fff;
      @extend .box-shadow;
    }
  }
</style>
