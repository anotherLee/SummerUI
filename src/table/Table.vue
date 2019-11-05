<template>
  <div class="s-table-wrapper">
    <table class="s-table" :class="{ bordered: borderVisible, compact, striped }">
      <thead>
      <tr>
        <th v-if="numberVisible"><input type="checkbox"></th>
        <th v-for="column in columns">{{ column.text }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in dataSource">
        <td v-if="numberVisible"><input type="checkbox" @change="onChangeItem(item, index, $event)"></td>
        <template v-for="column in columns">
          <td>{{ item[column.field] }}</td>
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
        required: true
      },
      selectedItems: {
        type: Array,
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
    methods: {
      onChangeItem(item, index, $event) {
        let selected = $event.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        if (selected) {
          copy.push(item)
        } else {
          console.log(this.selectedItems.indexOf(item))
          copy.splice(this.selectedItems.indexOf(item), 1)
        }
        this.$emit('update:selectedItems', copy)
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
