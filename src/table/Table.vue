<template>
  <div class="s-table-wrapper">
    <table class="s-table" :class="{ bordered: borderVisible, compact, striped }">
      <thead>
      <tr>
        <th v-if="numberVisible">
          <input type="checkbox" ref="allCheck" :checked="allSelected" @change="onChangeAll($event)">
        </th>
        <th v-for="column in columns" :key="column.field">{{ column.text }}</th>
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
  export default {
    name: 's-table',
    props: {
      columns: {
        type: Array,
        required: true
      },
      dataSource: {
        type: Array,
        required: true,
        validator(arr) {
          let noIdItems = arr.filter(item => !item.id)
          return noIdItems.length === 0
        }
      },
      selectedItems: {
        type: Array,
        required: true,
        default: () => []
      },
      numberVisible: {
        type: Boolean,
        default: false
      },
      borderVisible: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    computed: {
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

      onChangeAll(e) {
        let selected = e.target.checked
        let all = JSON.parse(JSON.stringify(this.dataSource))
        this.$emit('update:selectedItems', selected ? all : [])
      },

      selectedHasSelf(selfItem) {
        return this.selectedItems.find(ele => ele.id === selfItem.id)
      }
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
