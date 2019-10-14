<template>
  <div class="s-slides">
    <div class="s-slides-window">
      <slot></slot>
    </div>
    <div class="s-dots">
      <span v-for="(n, index) in childrenLength" :class="{ active: selectedIndex === index }"
            @click="select(index)"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-slides',
    props: {
      selected: {
        type: String
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined, // 上次选中的索引
      }
    },

    computed: {
      /*
       * 所有children组件的name
       */
      names() {
        const children = this.$children
        return children ? children.map(vm => vm.name) : []
      },
      /*
       * 被选中children的index
       */
      selectedIndex() {
        return this.names.indexOf(this.selected) || 0
      }
    },

    mounted() {
      this.updateChildren()
      this.playAutomatically()
      this.childrenLength = this.$children.length
    },

    /*
     * 当props或者data更新后都会触发
     */
    updated() {
      this.updateChildren()
    },
    methods: {
      /*
       * 自动播放
       */
      playAutomatically() {
        let index = this.names.indexOf(this.getSelected())

        const run = () => {
          if (index === this.names.length) {
            index = 0
          }
          if (index === -1) {
            index = this.names.length - 1
          }
          // 相当于选中小点
          this.select(index)
          index--
          setTimeout(run, 3000)
        }

        if (this.autoPlay) {
          run()
        }
      },

      /*
       * 找到当前页的name
       */
      getSelected() {
        let [first] = this.$children
        return this.selected || first.name
      },

      /*
       * 更新children组件
       */
      updateChildren() {
        let [first] = this.$children
        this.$children.forEach(vm => {
          vm.selected = this.selected || first.name
        })
      },

      /*
       * 选中小点
       */
      select(index) {
        this.lastSelectedIndex = index
        // 在这里设置完以后，轮播就滚到下一页了
        this.$emit('update:selected', this.names[index])
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  .s-slides {
    position: relative;
    width: 100%; height: 100%;
    
    &-window {
      position: relative;
      width: 100%; height: 100%;
      overflow: hidden;
      border: 1px solid blue;
    }
    
    .s-dots {
      position: absolute;
      bottom: 10%; left: 50%; transform: translateX(-50%);
      
      > span {
        display: inline-block;
        width: 15px; height: 15px;
        margin: 0 10px;
        border: 1px solid #ddd;
        border-radius: 50%;
        cursor: pointer;
        
        &.active {
          background-color: #ddd;
        }
      }
    }
  }
</style>
