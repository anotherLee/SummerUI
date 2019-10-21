<template>
  <div class="s-date-picker" v-click-outside="closePop">
    <Input type="text" @focus="onFocus" :value="dateValue"/>
    <div class="s-date-picker-pop" v-if="popVisible" @selectstart.prevent ref="pop" :style="popSize">
      <div class="s-date-picker-nav">
        <template v-if="mode === 'days'">
          <span class="doubleLeft" @click="onClickPrevYear"><Icon name="moveLeft"></Icon></span>
          <span class="innerIcon singleLeft" @click="onClickPrevMonth"><Icon name="back"></Icon></span>
          <span class="yearAndMonth">
            <span @click="onClickYear">{{ display.year }}年</span>
            <span @click="onClickMonth">{{ display.month + 1 }}月</span>
          </span>
          <span class="innerIcon singleRight" @click="onClickNextMonth"><Icon name="next"></Icon></span>
          <span class="doubleRight" @click="onClickNextYear"><Icon name="moveRight"></Icon></span>
        </template>
        
        <template v-if="mode === 'months'">
          <span class="doubleLeft" @click="prevYear"><Icon name="moveLeft"></Icon></span>
          <span class="singleYear">{{ display.year }}</span>
          <span class="doubleRight" @click="nextYear"><Icon name="moveRight"></Icon></span>
        </template>
        
        <template v-if="mode === 'years'">
          <span class="doubleLeft" @click="prevYear"><Icon name="moveLeft"></Icon></span>
          <span class="startEndYear">{{ startYear }}-{{ endYear }}</span>
          <span class="doubleRight" @click="nextYear"><Icon name="moveRight"></Icon></span>
        </template>
      </div>
      
      <div class="s-date-picker-content">
        <template v-if="mode === 'years'">
          <div class="s-date-picker-content-years">
            <span class="s-date-picker-year" v-for="(n,index) in 12">
              <span
                      :class="{ notScope: n === 1 || n === 12, selectedMonth: startYear - 1 + index === display.year }"
                      @click="selectYear(startYear - 1 + index)">{{ `${startYear - 1 + index}年` }}</span>
            </span>
          </div>
        </template>
        
        <template v-if="mode === 'months'">
          <div class="s-date-picker-content-months">
            <span class="s-date-picker-month" v-for="n in 12">
              <span :class="{ selectedMonth: n === display.month + 1 }"
                    @click="selectMonth(n-1)">{{ `${months[n]}月` }}</span>
            </span>
          </div>
        </template>
        
        <template v-if="mode === 'days'">
          <div class="s-date-picker-content-header">
            <span v-for="i in 7" :key="i">{{ weekdays[i] }}</span>
          </div>
          <div v-for="i in 6" :key="i" class="s-date-picker-content-row">
          <span v-for="j in 7" :key="j"
                class="s-date-picker-content-cell"
                :class="{ notCurrent: days[(i-1)* 7 + j - 1].getMonth() !== display.month, selectedDay: sameDay(days[(i-1)* 7 + j - 1], value)}"
                @click="onClickCell(days[(i-1)* 7 + j - 1])">{{ days[(i-1)* 7 + j - 1].getDate() }}</span>
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
        popSize: {
          minWidth: 0,
          minHeight: 0
        },
        display: { year, month },
        weekdays: {
          1: '一',
          2: '二',
          3: '三',
          4: '四',
          5: '五',
          6: '六',
          7: '日',
        },
        months: {
          1: '一',
          2: '二',
          3: '三',
          4: '四',
          5: '五',
          6: '六',
          7: '七',
          8: '八',
          9: '九',
          10: '十',
          11: '十一',
          12: '十二'
        }
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
      },
      startYear() {
        const { year } = this.display
        return year - year % 10
      },
      endYear() {
        return this.startYear + 9
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
          this.popSize = {
            minWidth: width + 'px',
            minHeight: height + 'px'
          }
        })
      },
      onClickMonth() {
        setTimeout(() => {
          this.mode = 'months'
        })
      },
      onClickYear() {
        setTimeout(() => {
          this.mode = 'years'
        })
      },
      closePop() {
        this.popVisible = false
        this.mode = 'days'
      },
      onClickCell(date) {
        this.$emit('update:value', date)
        this.closePop()
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
      },

      /*
       * years模式下点击上一年
       */
      prevYear() {
        let { year, month } = this.display
        this.display = {
          year: year - 1,
          month
        }
      },

      /*
       * years模式下点击下一年
       */
      nextYear() {
        let { year, month } = this.display
        this.display = {
          year: year + 1,
          month
        }
      },

      /*
       * 点击选择月份
       */
      selectMonth(n) {
        const { year, month } = this.display
        this.display = {
          year,
          month: n
        }
        setTimeout(() => {
          this.mode = 'days'
        })
      },
      
      selectYear(n) {
        const { year, month } = this.display
        this.display = {
          year: n,
          month
        }
        setTimeout(() => {
          this.mode = 'months'
        })
      },

      /*
       * 判断两个日期对象是否是同一时刻
       */
      sameDay(date1, date2) {
        let [year1, month1, day1] = helper.getYearMonthDate(date1)
        let [year2, month2, day2] = helper.getYearMonthDate(date2)
        return year1 === year2 && month1 === month2 && day1 === day2
      },
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
    display: inline-flex;
    
    .s-date-picker-pop {
      position: absolute; top: 100%; margin-top: 2px;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      box-shadow: 0 0 3px $box-shadow-color;
      
      .s-date-picker-nav {
        display: flex; align-items: center; justify-content: space-between;
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
              /*margin-left: 1em;*/
            }
            
            &.singleRight {
              /*margin-right: 1em;*/
            }
          }
        }
        
        .yearAndMonth {
          display: inline-block;
          /*margin: 0 auto;*/
          text-align: center;
          
          > span {
            font-weight: bold;
            cursor: pointer;
          }
        }
        
        .startEndYear, .singleYear {
          font-weight: bold;
        }
      }
      
      .s-date-picker-content {
        padding: 8px;
        
        .s-date-picker-content-header {
          white-space: nowrap;
          
          > span {
            display: inline-flex; justify-content: center; align-items: center;
            width: 32px; height: 32px;
            color: rgba(0, 0, 0, 0.65);
          }
        }
        
        .s-date-picker-content-row {
          white-space: nowrap;
          
          .s-date-picker-content-cell {
            display: inline-flex; justify-content: center; align-items: center;
            width: 32px; height: 32px;
            cursor: pointer;
            color: rgba(0, 0, 0, 0.65);
            
            &.notCurrent {
              color: #999;
            }
            
            &.selectedDay {
              background-color: #bae7ff;
            }
          }
        }
        
        &-months, &-years {
          height: 100%;
          
          > span {
            display: inline-block;
            text-align: center;
            width: 33.3%; height: 60px; line-height: 60px;
            cursor: pointer;
            
            > span {
              padding: 4px 6px;
              color: rgba(0, 0, 0, 0.65);
              
              &.selectedMonth {
                background-color: #bae7ff;
              }
              
              &.notScope {
                color: #999;
              }
            }
          }
        }
      }
    }
  }
</style>
