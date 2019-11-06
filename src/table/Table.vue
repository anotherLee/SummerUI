<template>
  <div class="s-table-wrapper">
    <table class="s-table" :class="{ bordered: borderVisible, compact, striped }">
      <thead>
      <tr>
        <th v-if="numberVisible">
          <input type="checkbox" ref="allCheck" :checked="allSelected" @change="onChangeAll($event)">
        </th>
        <th class="s-table-header" v-for="column in columns" :key="column.field">
          <div class="s-table-header-inner">
            {{ column.text }}
            <span
                    v-if="orderBy.hasOwnProperty(column.field)"
                    class="s-table-sorter" @click="changeOrderBy(column.field)">
              <Icon name="ascend" :class="{active: orderBy[column.field] === 'ascend'}"></Icon>
              <Icon name="descend" :class="{active: orderBy[column.field] === 'descend'}"></Icon>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in dataSource">
        <td v-if="numberVisible">
          <input
                  type="checkbox"
                  :checked="selectedHasSelf(item)"
                  @change="onChangeItem(item, index, $event)">
        </td>
        <template v-for="column in columns">
          <td :key="">{{ item[column.field] }}</td>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Icon from '../icon/Icon'

  export default {
    name: 's-table',
    props: {
      /*
       * 表头
       */
      columns: {
        type: Array,
        required: true
      },
      /*
       * 所有的数据
       */
      dataSource: {
        type: Array,
        required: true,
        validator(arr) {
          let noIdItems = arr.filter(item => !item.id)
          return noIdItems.length === 0
        }
      },
      /*
       * 被选中的数据
       */
      selectedItems: {
        type: Array,
        required: true,
        default: () => []
      },
      /*
       * 每行第一项要不要
       */
      numberVisible: {
        type: Boolean,
        default: false
      },
      /*
       * 外边框
       */
      borderVisible: {
        type: Boolean,
        default: false
      },
      /*
       * 是否紧凑
       */
      compact: {
        type: Boolean,
        default: false
      },
      /*
       * 是否有斑马纹
       */
      striped: {
        type: Boolean,
        default: true
      },
      /*
       * 排序规则
       */
      orderBy: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {}
    },
    computed: {
      /*
       * 判断是否全部选中
       */
      allSelected() {
        const a = this.selectedItems.map(item => item.id).sort()
        const b = this.dataSource.map(item => item.id).sort()

        if (a.length === b.length) {
          for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
              return false
            }
          }
          return true
        }
        return false
      }
    },
    watch: {
      selectedItems() {
        let { allCheck } = this.$refs
        let length = this.selectedItems.length
        if (length > 0 && length < this.dataSource.length) {
          allCheck.indeterminate = true
        } else {
          allCheck.indeterminate = false
        }
      }
    },
    methods: {
      /*
       * 选中或取消一项
       */
      onChangeItem(item, index, $event) {
        let selected = $event.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        if (selected) {
          copy.push(item)
        } else {
          copy.splice(this.selectedItems.findIndex(ele => ele.id === item.id), 1)
        }
        this.$emit('update:selectedItems', copy)
      },

      /*
       * 选中或者取消全部
       */
      onChangeAll(e) {
        let selected = e.target.checked
        let all = JSON.parse(JSON.stringify(this.dataSource))
        this.$emit('update:selectedItems', selected ? all : [])
      },

      /*
       * 判断选中的 selectedItems 中是否有自己
       */
      selectedHasSelf(selfItem) {
        return this.selectedItems.find(ele => ele.id === selfItem.id)
      },

      /*
       * 点击排序
       */
      changeOrderBy(field) {
        const copy = JSON.parse(JSON.stringify(this.orderBy))
        let oldValue = copy[field]
        if (oldValue === 'ascend') {
          copy[field] = 'descend'
        } else if (oldValue === 'descend') {
          copy[field] = true
        } else {
          copy[field] = 'ascend'
        }
        this.$emit('update:orderBy', copy)
      }
    },
    components: {
      Icon
    }
  }
</script>

<style lang="scss" scoped>
  @import '../var';
  
  $grey: darken($grey, 20%);
  .s-table-wrapper {
    .s-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      border-bottom: 1px solid $grey;
      
      &-header {
        &-inner {
          display: inline-flex; align-items: center;
          height: 100%; width: 100%;
          
          .s-table-sorter {
            display: inline-flex;
            flex-direction: column;
            margin-left: 0.2em;
            cursor: pointer;
            
            svg {
              width: 8px; height: 8px;
              fill: darken($grey, 15%);
              
              &.active {
                fill: red;
              }
              
              &:nth-child(1) {
                position: relative;
                top: 1px;
              }
              
              &:nth-child(2) {
                position: relative;
                bottom: 1px;
              }
            }
          }
        }
      }
      
      &.bordered {
        border-top: 1px solid $grey;
        border-left: 1px solid $grey;
        border-right: 1px solid $grey;
        
        td, th {
          border: 1px solid $grey;
        }
      }
      
      td, th {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid $grey;
      }
    }
    
    .s-table.compact {
      td, th {
        padding: 4px;
      }
    }
    
    .s-table.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background-color: #fff;
          }
          
          &:nth-child(even) {
            background-color: lighten($grey, 20%);
          }
        }
      }
    }
  }
</style>
