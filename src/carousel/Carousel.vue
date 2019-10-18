<template>
  <div class="s-carousel">
    <div class="s-pages">
      <slot></slot>
    </div>
    <div class="s-actions">
      <span class="prev" @click="clickPrev">
        <Icon name="back"></Icon>
      </span>
      <span class="next" @click="clickNext">
        <Icon name="next"></Icon>
      </span>
      <div class="s-dots">
        <span v-for="(n, i) in children.length" :class="{ active: i === index }" @click="clickDot(i)"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../icon/Icon'

  export default {
    name: 's-carousel',
    props: {
      selected: {
        type: String
      }
    },
    data() {
      return {
        children: [],
        direction: 1,
        lastPageIndex: 0, // 上一页索引
      }
    },
    computed: {
      names() {
        return this.children.map(page => page.name)
      },
      index() {
        return this.names.indexOf(this.selected)
      },
      nextIndex() {
        return (this.index + 1) % this.children.length
      },
      prevIndex() {
        return (this.index - 1 + this.children.length) % this.children.length
      }

    },
    watch: {
      selected() {
        console.log('setPages')
        this.setPages()
      }
    },
    mounted() {
      this.children = this.$children.filter(vm => vm.name !== 'back' && vm.name !== 'next')
      this.onFinish()
    },
    methods: {
      clickPrev() {
        this.direction = -1
        this.lastPageIndex = this.index
        this.$emit('update:selected', this.names[this.prevIndex])
      },

      clickNext() {
        this.direction = 1
        this.lastPageIndex = this.index
        this.$emit('update:selected', this.names[this.nextIndex])
      },

      clickDot(i) {
        this.direction = i > this.index ? 1 : -1
        this.lastPageIndex = this.index
        this.$emit('update:selected', this.names[i])
      },

      setPages() {
        if (this.lastPageIndex === this.index) return
        this.slide(this.children[this.lastPageIndex].$el, this.children[this.index].$el, this.direction, this.onFinish)
      },
      
      onFinish() {
        this.children.forEach((vm, n) => {
          vm.$el.style.zIndex = '1'
          if (n === this.index) {
            vm.$el.style.zIndex = '10'
          }
        })
      },

      slide(fromNode, toNode, direction, onFinish) {
        let start1 = 0, end1 = direction === 1 ? -100 : 100
        let start2 = direction === 1 ? 100 : -100, end2 = 0
        let step = 4
        fromNode.style.zIndex = '10'
        toNode.style.zIndex = '9'
        toNode.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)'

        function fromNodeAnimation() {
          if (direction === 1) {
            if (start1 > end1) {
              start1 -= step
              fromNode.style.transform = `translateX(${start1}%)`
              requestAnimationFrame(fromNodeAnimation)
            } else {
              fromNode.style.transform = 'translateX(-100%)'
            }
          } else {
            if (start1 < end1) {
              start1 += step
              fromNode.style.transform = `translateX(${start1}%)`
              requestAnimationFrame(fromNodeAnimation)
            } else {
              fromNode.style.transform = 'translateX(100%)'
            }
          }

        }

        function toNodeAnimation() {
          if (direction === 1) {
            if (start2 > end2) {
              start2 -= step
              toNode.style.transform = `translateX(${start2}%)`
              requestAnimationFrame(toNodeAnimation)
            } else {
              toNode.style.transform = 'translateX(0)'
              onFinish()
            }
          } else {
            if (start2 < end2) {
              start2 += step
              toNode.style.transform = `translateX(${start2}%)`
              requestAnimationFrame(toNodeAnimation)
            } else {
              toNode.style.transform = 'translateX(0)'
              onFinish()
            }
          }
        }

        fromNodeAnimation()
        toNodeAnimation()
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  .s-carousel {
    position: relative;
    width: 400px; height: 200px;
    
    .s-pages {
      position: relative;
      width: 100%; height: 100%;
      overflow: hidden;
    }
    
    .s-actions {
      svg {
        fill: #fff;
      }
      
      .prev, .next {
        display: inline-flex; justify-content: center; align-items: center;
        width: 24px; height: 24px;
        border-radius: 50%; border: 1px solid #fff;
        position: absolute; top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 11;
      }
      
      .prev {
        left: 5%;
      }
      
      .next {
        right: 5%;
      }
      
      .s-dots {
        position: absolute; bottom: 5px; left: 50%;
        transform: translateX(-50%);
        z-index: 11;
        
        > span {
          display: inline-block;
          width: 14px; height: 4px; margin: 0 2px;
          border-radius: 2px;
          background-color: #666;
          cursor: pointer;
          
          &.active {
            width: 20px;
            background-color: #999;
          }
        }
      }
    }
  }
</style>
