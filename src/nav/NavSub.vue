<template>
  <div class="s-nav-sub" v-click-outside="close">
    <span class="nav-sub-title" @click="onClick" :class="{ active, vertical: root.vertical }">
      <slot name="title"></slot>
      <span class="nav-sub-icons" :class="[open ? 'left' : 'right', root.vertical ? 'vertical' : '']">
        <Icon class="nav-sub-icon" name="left"></Icon>
      </span>
    </span>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="nav-sub-popover" :class="{ vertical: root.vertical }" v-show="open">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import clickOutside from "../clickOutside"
  import Icon from '../icon/Icon'

  export default {
    name: 's-nav-sub',
    inject: ['root'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        open: false,
      }
    },
    computed: {
      active() {
        return this.root.namePath.indexOf(this.name) >= 0
      }
    },
    methods: {
      onClick() {
        this.open = !this.open
      },
      close() {
        this.open = false
      },
      updateNamePath() {
        if (this.root.namePath.indexOf(this.name) < 0) {
          this.root.namePath.unshift(this.name)
        }
        if (this.$parent.updateNamePath) {
          this.$parent.updateNamePath()
        }
      },

      /*
       * 开始动画前
       */
      beforeEnter(el) {
        el.style.height = 0
      },
      
      /*
       * 进入动画
       */
      enter(el) {
        el.style.height = 'auto'
        let { height } = el.getBoundingClientRect()
        el.style.height = 0
        el.getBoundingClientRect()
        el.style.height = `${height}px`
      },
      
      /*
       * 动画完成后
       */
      afterEnter(el) {
        el.style.height = 'auto'
      },

      /*
       * 离开动画
       */
      leave(el) {
        let { height } = el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.getBoundingClientRect()
        el.style.height = 0
      },
      
      /*
       * 离开之后
       */
      afterLeave(el) {
        el.style.height = 'auto'
      }
    },
    components: {
      Icon
    },
    directives: { clickOutside }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  .s-nav-sub {
    position: relative;
    
    .nav-sub-title {
      position: relative;
      display: flex; align-items: center; justify-content: space-between;
      vertical-align: middle;
      padding: 10px 20px;
      cursor: pointer;
      
      .nav-sub-icons {
        display: none;
        margin-left: 8px;
        
        &.right {
          transform: rotate(-180deg);
        }
        
        &.vertical {
          transform: rotate(90deg);
        }
        
        &.vertical.right {
          transform: rotate(-90deg);
        }
      }
      
      &.active:not(.vertical) {
        &:after {
          content: '';
          display: block;
          width: 100%;
          position: absolute; bottom: 0; left: 0;
          border-bottom: 2px solid $blue;
        }
      }
      &.vertical.active {
        color: $blue;
      }
    }
    
    .nav-sub-popover {
      position: absolute; left: 0; top: 100%;
      margin-top: 3px;
      white-space: nowrap;
      min-width: 6em;
      background-color: #fff;
      color: $light-color;
      font-size: $font-size;
      box-shadow: 0 0 3px $box-shadow-color;
      border-radius: $border-radius;
      
      &.vertical {
        position: static;
        border-radius: 0;
        box-shadow: none;
        transition: height 0.5s;
        overflow: hidden;
      }
    }
  }
  
  /* 这个样式很重要,嵌套的时候用的 */
  .s-nav-sub .s-nav-sub {
    .nav-sub-title.active:not(.vertical) {
      &::after {
        display: none;
      }
    }
    
    .nav-sub-title.vertical.active {
      color: inherit;
    }
    
    .nav-sub-popover {
      top: 0; left: 100%; margin-left: 5px;
    }
    
    .nav-sub-icons {
      display: inline-flex;
    }
  }
</style>
