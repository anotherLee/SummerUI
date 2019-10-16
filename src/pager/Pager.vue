<template>
  <div class="s-pager" :class="{ hide: hideIfOnePage && totalPages === 1 }">
    <span class="s-pager-nav prev" :class="{disabled: currentPage === 1}" @click="onClick(currentPage - 1)">
      <Icon name="back"></Icon>
    </span>
    <template v-for="page in pages">
      <template v-if="page === currentPage">
        <span class="s-current">{{ page }}</span>
      </template>
      
      <template v-else-if="page === '...'">
        <span class="s-separator">
          <Icon name="dots"></Icon>
        </span>
      </template>
      <template v-else>
        <span class="ordinary" @click="onClick(page)">{{ page }}</span>
      </template>
    </template>
    <span class="s-pager-nav next" :class="{disabled: currentPage === totalPages}" @click="onClick(currentPage + 1)">
      <Icon name="next"></Icon>
    </span>
  </div>
</template>

<script>
  import Icon from '../icon/Icon'

  export default {
    name: 's-pager',
    props: {
      totalPages: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      hideIfOnePage: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
      }
    },
    
    computed: {
      pages() {
        let pages = [
          1, this.totalPages, this.currentPage, this.currentPage - 1, this.currentPage - 2,
          this.currentPage + 1, this.currentPage + 2
        ]
        let newArr = this.sortAndUnique(pages).filter(n => n >= 1 && n <= this.totalPages)
        let result = newArr.reduce((prev, current, index) => {
          let next = newArr[index + 1]
          if (next && next - current > 1) {
            prev.push(current)
            prev.push('...')
          } else {
            prev.push(current)
          }
          return prev
        }, [])
        
        return result
      }
    },

    methods: {
      sortAndUnique(arr) {
        arr = arr.sort((a, b) => a - b)
        let obj = {}
        arr.forEach(n => obj[n] = true)
        return Object.keys(obj).map(key => parseInt(key))
      },
      onClick(number) {
        if (number >= 1 && number <= this.totalPages) {
          this.$emit('update:currentPage', number)
        }
      }
    },

    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  .s-pager {
    display: flex; justify-content: flex-start; align-items: center;
    
    &.hide {
      display: none;
    }
    
    > span {
      display: inline-flex; justify-content: center; align-items: center;
      min-width: 24px; min-height: 24px;
      padding: 0 4px; margin: 0 4px;
      border: 1px solid #e1e1e1;
      border-radius: $border-radius;
      color: $color;
      cursor: pointer;
      user-select: none;
      
      &:hover {border: 1px solid $blue;}
      
      &.s-current {border: 1px solid $blue;cursor: default;}
      
      &.s-separator {border: none;cursor: pointer;}
      
      &.s-pager-nav {
        &:hover {
          border: 1px solid #e1e1e1;
        }
      }
      &.s-pager-nav.disabled {
        background-color: $grey;
        cursor: not-allowed;
      }
    }
  }
</style>
