<template>
  <div class="s-date-picker" v-click-outside="closePop" style="border: 1px solid red">
    <Input type="text" @focus="onFocus"/>
    <div class="s-date-picker-pop" v-if="popVisible">
      <div class="s-date-picker-nav">
        <span><Icon name="moveLeft"></Icon></span>
        <span class="innerIcon"><Icon name="back"></Icon></span>
        <span @click="onClickYear">2018</span>
        <span @click="onClickMonth">8月</span>
        <span class="innerIcon"><Icon name="next"></Icon></span>
        <span><Icon name="moveRight"></Icon></span>
      </div>
      
      <div v-if="mode === 'years'" class="s-date-picker-content">年</div>
      <div v-else-if="mode === 'months'" class="s-date-picker-content">月</div>
      <div v-else class="s-date-picker-content">
        <div>
          <span v-for="i in 7">{{ weekdays[i] }}</span>
        </div>
        <div v-for="i in 6">
          <span v-for="j in 7">{{ days[(i-1)* 7 + j - 1].getDate() }}</span>
        </div>
        <div>
          <button>清除</button>
        </div>
      </div>
      
      <div class="s-date-picker-actions"></div>
    </div>
  </div>
</template>

<script>
  import Input from "../input/Input"
  import Icon from '../icon/Icon'
  import clickOutside from "../clickOutside"
  import helper from "./helper"

  export default {
    name: 's-date-picker',
    data() {
      return {
        popVisible: false,
        mode: 'days', // months years
        value: new Date(),
        weekdays: {
          1: '一',
          2: '二',
          3: '三',
          4: '四',
          5: '五',
          6: '六',
          7: '日',
        }
      }
    },
    computed: {
      days() {
        const d = this.value
        let first = helper.firstDayOfMonth(d)
        let last = helper.lastDayOfMonth(d)
        
        let arr1 = []
        let [year, month, day] = helper.getYearMonthDate(d)
        for (let i = first.getDate(); i <= last.getDate(); ++i) {
          arr1.push(new Date(year, month, i))
        }
        
        let n = first.getDay() === 0 ? 6 : first.getDay() - 1
        let arr2 = []
        for (let i = 0; i < n; ++i) {
          arr2.push(new Date(year, month, -i))
        }
        arr2 = arr2.reverse()

        let arr3 = []
        let m = 42 - n - arr1.length
        for (let i = 1; i <= m; ++i) {
          arr3.push(new Date(year, month+1, i))
        }
        
        return [...arr2, ...arr1, ...arr3]
      }
    },
    mounted() {
    },
    methods: {
      onFocus() {
        this.popVisible = true
      },
      onClickYear() {
        this.mode = 'years'
      },
      onClickMonth() {
        this.mode = 'months'
      },
      closePop() {
        this.popVisible = false
      }
    },
    directives: { clickOutside },
    components: {
      Input,
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  .s-date-picker {
    position: relative;
    
    .s-date-picker-pop {
      position: absolute; top: 100%; margin-top: 2px;
      padding: 8px;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      box-shadow: 0 0 3px $box-shadow-color;
      
      .s-date-picker-nav {
        display: flex; align-items: center;
        
        > span {
          display: inline-flex;
          
          &.innerIcon {
            svg {
              width: 0.8em;
            }
          }
        }
      }
    }
  }
</style>
