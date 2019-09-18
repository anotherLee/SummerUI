1. 按钮宽度不要写死

   ```css
   padding: 0 1em;
   ```

2. 写CSS时 `:root` 指的就是`html` 标签

3. 注意区分`Vue`的两个版本：`runtime only` 和 `runtime + compiler` 版本

4. 为了让icon和字一样大小，使用`em`作为单位

5. 实现icon居左还是居右，**使用css和props来处理** 

   ```css
   .s-button {
     display: inline-flex;  /* 注意这里哦 */
     justify-content: center;
     align-items: center;
   }
   /*
   ...
   */
   &.icon-left {
     .icon {
       order: 1;
     }
   
     .content {
       order: 2
     }
   }
   
   &.icon-right {
     .icon {
       order: 2;
     }
     .content {
       order: 1;
     }
   }
   ```

6. 设置了`display: inline-flex` 之后，需要`vertical-align: top` 来使多个按键对齐

7. **注意props要使用驼峰写法**

   - default
   - type
   - validator

8. hover到某个按钮上面让它上去

   ```css
   &:hover {
     position: relative;
     z-index: 1;
   }
   ```

9. 不是第一个元素

   ```css
   &:not(:first-child) {
     margin-left: -1px;
   }
   ```

10. 自动化测试

    - karma 运行器，**打开一个无头浏览器，跑测试脚本，然后把控制台输出显示到到终端** 
      - karma.conf.js 配置文件
    - travis ci
      - 添加.travis.yml

11.  发布npm包
    - 指定一个出口，并接所有的东西导出
    - 在npm注册一个账号
    - npm adduser