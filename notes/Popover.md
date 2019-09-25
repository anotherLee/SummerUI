1. **点击pop出来的框外面，pop出来的框消失的功能** 
   - **添加监听时需要异步，因为冒泡比JS慢；也可以使用stop来阻止冒泡来解决**  
   - 注意使用箭头函数

2. **遇到的三个问题** 
   - overflow: hidden 遮盖问题，使用`body.appendChild` 来解决，但是还有滚动距离的问题
   - 关闭重复
   - 取消监听
3. contentWrapper的`margin-top: -10px` 这个好厉害

4. 小三角如何添加 `box-shadow` 

   ```css
   filter: drop-shadow(0,0,2px,rgba(0,0,0,0.5));
   ```

5. 使用 **表驱动编辑的方式** 来优化多个if...else