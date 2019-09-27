---
sidebarDepth: 2
---
# 按钮

### 使用方法

<br>

<clientOnly>
  <button-demo></button-demo>
</clientOnly>

```vue
<template>
  <div class="button-demo">
    <s-button>默认按钮</s-button>
    <s-button icon="setting">设置</s-button>
    <s-button :loading="true">按钮</s-button>
  </div>
</template>

<script>
  import Button from "../../../src/Button"
  export default {
    components: {
      's-button': Button
    }
  }
</script>
````
