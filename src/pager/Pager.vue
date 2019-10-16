<template>
  <div class="s-pager">
    <span class="s-pager-item" :class="{active: page === currentPage, separator: page === '...'}" v-for="page in pages">{{ page }}</span>
  </div>
</template>

<script>
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
      let pages = [
        1, this.totalPages, this.currentPage, this.currentPage - 1, this.currentPage - 2,
        this.currentPage + 1, this.currentPage + 2
      ]
      let newArr = this.sortAndUnique(pages)
      let result = newArr.reduce((prev, current, index) => {
        let next = newArr[index + 1]
        if ( next && next - current > 1) {
          prev.push(current)
          prev.push('...')
        } else {
          prev.push(current)
        }
        return prev
      }, [])
      
      return {
        pages: result
      }
    },
    
    methods: {
      sortAndUnique(arr) {
        arr = arr.sort((a, b) => a - b)
        let obj = {}
        arr.forEach(n => obj[n] = true)
        return Object.keys(obj).map(key => parseInt(key))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  .s-pager {
    > span {
      display: inline-flex; justify-content: center; align-items: center;
      min-width: 24px; min-height: 24px;
      padding: 0 4px; margin: 0 4px;
      border: 1px solid #e1e1e1;
      border-radius: $border-radius;
      color: $color;
      cursor: pointer;
      &.active, &:hover {
        border: 1px solid $blue;
      }
      &.active {
        cursor: default;
      }
      &.separator {
        border: none;
      }
    }
  }
</style>
