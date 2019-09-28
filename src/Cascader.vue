<template>
  <div class="s-cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    
    <div class="cascader-popover" v-if="popoverVisible">
      <cascader-items :source-items="source"></cascader-items>
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
      }
    },
    data() {
      return {
        popoverVisible: false
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
    .trigger {
      border: 1px solid red;
      height: 32px;
      width: 120px;
    }
  }
</style>
