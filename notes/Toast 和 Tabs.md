### Toast



1. Toast组件的调用方法：`this.$Toast()` 同时用到插件的知识和`.vue` 来完成
2. 使用`Vue.extend()` 创建的构造函数在实例化之后必须`$mount` 不然它的生命周期钩子不会执行



### Tab

1. 使用`provide` 和 `inject` 在**祖孙组件之间共享数据** 
2. 使用 `eventBus` 来进行事件触发与监听
3. `vue` 的属性里**带有$前缀的是给用户使用，带下滑线前缀的是私用的** 
4. 在组件标签上添加`class` 或者 `style` 是可以的，**会被组件根元素使用** 
5. 对于`block` 元素使用 `margin: 0 auto；` 可以使其居中，使用`margin-left: auto` 可以**使其右对齐** 