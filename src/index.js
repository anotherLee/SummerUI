import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import Cascader from "./Cascader"
import CascaderItems from "./CascaderItems"
import Col from './Col'
import Collapse from "./Collapse"
import CollapseItem from "./CollapseItem"
import Content from "./Content"
import Footer from "./Footer"
import Header from "./Header"
import Icon from './Icon.vue'
import Input from './Input'
import Layout from "./Layout"
import Popover from "./Popover"
import Row from './Row'
import Sider from "./Sider"
import Tabs from "./Tabs"
import TabsBody from "./TabsBody"
import TabsHead from "./TabsHead"
import TabsItem from "./TabsItem"
import TabsPane from "./TabsPane"
import Toast from "./Toast"
import Slides from "./Slides"
import SlideItem from "./SlideItem"
import Vue from 'vue'
import db from './db'

import plugin from './plugin'

Vue.component('s-button', Button)
Vue.component('s-button-group', ButtonGroup)
Vue.component('s-cascader', Cascader)
Vue.component('s-cascader-item', CascaderItems)
Vue.component('s-col', Col)
Vue.component('s-collapse', Collapse)
Vue.component('s-collapse-item', CollapseItem)
Vue.component('s-content', Content)
Vue.component('s-footer', Footer)
Vue.component('s-header', Header)
Vue.component('s-icon', Icon)
Vue.component('s-input', Input)
Vue.component('s-layout', Layout)
Vue.component('s-popover', Popover)
Vue.component('s-row', Row)
Vue.component('s-sider', Sider)
Vue.component('s-tabs', Tabs)
Vue.component('s-tabs-body', TabsBody)
Vue.component('s-tabs-head', TabsHead)
Vue.component('s-tabs-item', TabsItem)
Vue.component('s-tabs-pane', TabsPane)
Vue.component('s-toast', Toast)
Vue.component('s-slides', Slides)
Vue.component('s-slide-item', SlideItem)
Vue.use(plugin)

function ajax(parent_id = 0) {
  return new Promise(function (resolve, reject) {
    window.setTimeout(() => {
      resolve(db.filter(item => item.parent_id === parent_id))
    }, 1000)
  })
}

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    inputValue: '',
    selectedTab: 'tab3',
    selectedItem: ['1'],
    source: [],
    cascaderSelected: [],
    itemSelected: "1"
  },
  created() {
    // ajax(0).then(res => {
    //   this.source = res
    // })

    let n = 1
    setInterval(() => {
      n++
      if (n === 4) {
        n = 1
      }
      this.itemSelected = n.toString()
      console.log(this.itemSelected)
    }, 3000)
  },
  methods: {
    inputChange(e) {
      console.log(1)
      console.log(e)
    },
    clickButton() {
      this.$toast('很很多文字很多', {
        closeButton: {}
      })
    },
    getNewSelected(newItem) {
      this.cascaderSelected = newItem
    },
    loadData(node, callback) {
      const { id } = node
      ajax(id).then(result => {
        // console.log(result)
        callback(result)
      })
    }
  }
})
