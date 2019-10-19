<template>
  <div class="s-date-picker" v-click-outside="closePop" style="border: 1px solid red">
    <Input type="text" @focus="onFocus" :value="dateValue" />
    <div class="s-date-picker-pop" v-if="popVisible" @selectstart.prevent ref="pop">
      <div class="s-date-picker-nav">
        <span class="doubleLeft" @click="onClickPrevYear"><Icon name="moveLeft"></Icon></span>
        <span class="innerIcon singleLeft" @click="onClickPrevMonth"><Icon name="back"></Icon></span>
        <span class="yearAndMonth" @click="onClickMonth">
          <span>{{ display.year }}年</span>
          <span>{{ display.month + 1 }}月</span>
        </span>
        <span class="innerIcon singleRight" @click="onClickNextMonth"><Icon name="next"></Icon></span>
        <span class="doubleRight" @click="onClickNextYear"><Icon name="moveRight"></Icon></span>
      </div>
      
      <div class="s-date-picker-content">
        <template v-if="mode === 'months'">
          选择年和月
        </template>
        <template v-if="mode === 'days'">
          <div class="s-date-picker-content-header">
            <span v-for="i in 7" :key="i">{{ weekdays[i] }}</span>
          </div>
          <div v-for="i in 6" :key="i" class="s-date-picker-content-row">
          <span v-for="j in 7" :key="j"
                class="s-date-picker-content-cell"
                :class="{ notCurrent: days[(i-1)* 7 + j - 1].getMonth() !== display.month}"
                @click="onClickCell(days[(i-1)* 7 + j - 1])">{{ days[(i-1)* 7 + j - 1].getDate() }}</span>
          </div>
          <div>
            <button>清除</button>
          </div>
        </template>
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
    props: {
      value: {
        type: Date,
        default: () => new Date()
      }
    },
    data() {
      let [year, month] = helper.getYearMonthDate(this.value)
      return {
        popVisible: false,
        mode: 'days', // months years
        weekdays: {
          1: '一',
          2: '二',
          3: '三',
          4: '四',
          5: '五',
          6: '六',
          7: '日',
        },
        display: { year, month },
      }
    },
    computed: {
      days() {
        const d = new Date(this.display.year, this.display.month, 1)
        let first = helper.firstDayOfMonth(d)

        let arr = []
        let [year, month, day] = helper.getYearMonthDate(d)

        let weekDay = first.getDay()
        let offset = weekDay === 0 ? 6 : weekDay - 1
        let firstOne = new Date(year, month, -(offset - 1))

        for (let i = 0; i < 42; ++i) {
          arr.push(new Date(year, firstOne.getMonth(), firstOne.getDate() + i))
        }
        return arr
      },
      dateValue() {
        let [year, month, day] = helper.getYearMonthDate(this.value)
        return `${year}-${this.padding(month + 1)}-${day}`
      }
    },
    watch: {
      value() {
        this.display = {
          year: this.value.getFullYear(),
          month: this.value.getMonth()
        }
      }
    },
    mounted() {
    },
    methods: {
      onFocus() {
        this.popVisible = true
        this.$nextTick(() => {
          const { pop } = this.$refs
          const { width, height } = pop.getBoundingClientRect()
          console.log(width, pop)
          pop.style.width = `${width}px`
          pop.style.height = `${height}px`
        })
      },
      onClickMonth() {
        if (this.mode !== 'months') {
          this.mode = 'months'
        } else {
          this.mode = 'days'
        }
      },
      closePop() {
        this.popVisible = false
      },
      onClickCell(date) {
        this.$emit('update:value', date)
      },
      padding(n) {
        return n < 10 ? `0${n}` : `${n}`
      },
      onClickPrevMonth() {
        this.changeTime(-1)
      },
      onClickNextMonth() {
        this.changeTime(1)
      },
      onClickPrevYear() {
        this.changeTime(-12)
      },
      onClickNextYear() {
        this.changeTime(12)
      },
      changeTime(n) {
        let { year, month } = this.display
        let newDate = helper.addMonth(new Date(year, month), n)
        this.display = {
          year: newDate.getFullYear(),
          month: newDate.getMonth()
        }
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
      border: 1px solid $border-color;
      border-radius: $border-radius;
      box-shadow: 0 0 3px $box-shadow-color;
      
      .s-date-picker-nav {
        display: flex; align-items: center; justify-content: center;
        padding: 8px;
        border-bottom: 1px solid $border-color;
        .doubleLeft, .doubleRight {
          svg {
            fill: #666;
          }
        }
        > span {
          display: inline-flex;
          
          &.innerIcon {
            svg {
              width: 0.8em;
              fill: #666;
            }
            &.singleLeft {
              margin-left: 1em;
            }
            &.singleRight {
              margin-right: 1em;
            }
          }
        }
        
        .yearAndMonth {
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          >span{
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
      
      .s-date-picker-content {
        padding: 8px;
        .s-date-picker-content-header {
          > span {
            display: inline-flex; justify-content: center; align-items: center;
            width: 32px; height: 32px;
          }
        }
        
        .s-date-picker-content-row {
          .s-date-picker-content-cell {
            display: inline-flex; justify-content: center; align-items: center;
            width: 32px; height: 32px;
            cursor: pointer;
            &.notCurrent {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
