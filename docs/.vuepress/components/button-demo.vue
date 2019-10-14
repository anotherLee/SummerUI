<template>
  <div class="button-demo">
    <s-button>默认按钮</s-button>
    <s-button icon="setting">设置</s-button>
    <s-button :loading="true">按钮</s-button>
  </div>
</template>

<script>
  import Button from "../../../src/button/Button"
  export default {
    components: {
      's-button': Button
    }
  }
</script>
