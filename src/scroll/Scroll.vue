<template>
  <div class="s-scroll-wrapper" ref="parent" @selectstart.prevent @wheel="onWheel">
    <div class="s-scroll" ref="child" :style="{transform: `translateY(${this.contentY}px)`}" @selectstart.prevent>
      <slot></slot>
    </div>
    <div class="s-scroll-track">
      <div class="s-scroll-bar" ref="bar" @mousedown="onMouseDownBar" @selectstart.prevent>
        <div class="s-scroll-bar-inner"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .s-scroll-wrapper {
    position: relative;
    padding-right: 14px;
    border: 5px solid red;
    overflow: hidden;
    
    .s-scroll {
      border: 5px solid green;
      transition: transform 0.05s ease;
    }
    
    .s-scroll-track {
      position: absolute; right: 0; top: 0;
      height: 100%; width: 14px;
      background-color: #fafafa; border-left: 1px solid #e8e7e8;
      
      .s-scroll-bar {
        position: absolute; top: 0; left: 50%; margin-left: -4px;
        width: 8px;
        padding: 2px 0;
        
        &-inner {
          height: 100%;
          background-color: #c2c2c2;
          border-radius: 4px;
          
          &:hover {
            background-color: #7d7d7d;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    name: "s-scroll",
    data() {
      return {
        parentInnerHeight: undefined, // bar 所在 track 容器高度
        childHeight: undefined, // 滚动内容的高度
        barHeight: undefined, // bar 高度
        startPosition: {}, // 开始拖拽的起点
        endPosition: {}, // 拖拽过程中的经过点和终点
        isMoving: false, // 是否正在移动
        contentY: 0, // 内容移动的距离
        barMoveY: 0, // 滚动条移动的距离
      }
    },
    computed: {
      /*
       * bar 能移动的最大距离
       */
      barMaxY() {
        return this.parentInnerHeight - this.barHeight
      }
    },
    mounted() {
      const { parent, child } = this.$refs
      this.childHeight = child.getBoundingClientRect().height
      this.parentInnerHeight = this.getDomInnerHeight(parent)

      this.updateScrollBar()
      this.listenToDocument()
    },
    methods: {
      listenToDocument() {
        document.addEventListener('mousemove', this.onMouseMoveBar)
        document.addEventListener('mouseup', this.onMouseUpBar)
      },
      calculateContentY(e) {
        if (e.deltaY > 25) {
          this.contentY -= 25 * 3
        } else if (e.deltaY < -25) {
          this.contentY -= -25 * 3
        } else {
          this.contentY -= e.deltaY * 3
        }
      },
      limitContentY() {
        let maxHeight = this.childHeight - this.parentInnerHeight
        if (this.contentY > 0) {
          this.contentY = 0
        } else if (this.contentY < -maxHeight) {
          this.contentY = -maxHeight
        }
      },
      onWheel(e) {
        this.$refs.child.transition = 'transform 0.05s ease'
        this.calculateContentY(e)
        this.limitContentY()
        this.updateScrollBar()
      },
      
      updateScrollBar() {
        const { bar } = this.$refs
        this.barHeight = this.parentInnerHeight * this.parentInnerHeight / this.childHeight
        bar.style.height = this.barHeight + 'px'
        this.barMoveY = Math.abs(this.contentY) / this.childHeight * this.parentInnerHeight
        bar.style.transform = `translateY(${this.barMoveY}px)`
      },

      /*
       * 获取元素的内部高度，即除去边框和padding的高度
       */
      getDomInnerHeight(dom) {
        let { borderTopWidth, borderBottomWidth, paddingTop, paddingBottom } = window.getComputedStyle(dom)
        borderTopWidth = parseInt(borderTopWidth)
        borderBottomWidth = parseInt(borderBottomWidth)
        paddingTop = parseInt(paddingTop)
        paddingBottom = parseInt(paddingBottom)
        const { height } = dom.getBoundingClientRect()
        return height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom
      },

      onMouseDownBar(e) {
        let { clientX, clientY } = e
        this.startPosition = {
          x: clientX,
          y: clientY
        }

        this.isMoving = true
      },

      onMouseMoveBar(e) {
        if (!this.isMoving) return
        const { clientX, clientY } = e
        const { bar } = this.$refs
        this.endPosition = {
          x: clientX,
          y: clientY
        }
        
        this.barMoveY = this.barMoveY + (this.endPosition.y - this.startPosition.y)
        if (this.barMoveY < 0) {
          this.barMoveY = 0
        } else if (this.barMoveY > this.barMaxY) {
          this.barMoveY = this.barMaxY
        }
        bar.style.transform = `translateY(${this.barMoveY}px)`
        this.contentY = -(this.barMoveY / this.parentInnerHeight * this.childHeight)
        this.$refs.child.style.transition = 'none'
        this.startPosition = this.endPosition
      },

      onMouseUpBar() {
        this.isMoving = false
      }
    },
    beforeDestroy() {
      document.removeEventListener('mousemove', this.onMouseDownBar)
      document.removeEventListener('mouseup', this.onMouseUpBar)
      
    }
  }
</script>

