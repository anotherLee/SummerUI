<template>
  <div class="s-cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :source-items="source" :height="popoverHeight"></cascader-items>
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
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    },
    mounted() {
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
