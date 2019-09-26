import Vue from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import ButtonGroup from './ButtonGroup.vue'
import Input from './Input'
import Row from './Row'
import Col from './Col'
import Layout from "./Layout"
import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"
import Sider from "./Sider"
import Toast from "./Toast"
import Tabs from "./Tabs"
import TabsHead from "./TabsHead"
import TabsItem from "./TabsItem"
import TabsBody from "./TabsBody"
import TabsPane from "./TabsPane"
import Popover from "./Popover"
import Collapse from "./Collapse"
import CollapseItem from "./CollapseItem"

import plugin from './plugin'

Vue.component('s-button', Button)
Vue.component('s-icon', Icon)
Vue.component('s-button-group', ButtonGroup)
Vue.component('s-input', Input)
Vue.component('s-row', Row)
Vue.component('s-col', Col)
Vue.component('s-layout', Layout)
Vue.component('s-header', Header)
Vue.component('s-footer', Footer)
Vue.component('s-content', Content)
Vue.component('s-sider', Sider)
Vue.component('s-toast', Toast)
Vue.use(plugin)
Vue.component('s-tabs', Tabs)
Vue.component('s-tabs-head', TabsHead)
Vue.component('s-tabs-item', TabsItem)
Vue.component('s-tabs-body', TabsBody)
Vue.component('s-tabs-pane', TabsPane)
Vue.component('s-popover', Popover)
Vue.component('s-collapse', Collapse)
Vue.component('s-collapse-item', CollapseItem)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    inputValue: '',
    selectedTab: 'tab3',
    selectedItem: ['1']
  },
  created() {
  },
  methods: {
    inputChange(e) {
      console.log(1)
      console.log(e)
    },
    clickButton() {
      this.$toast('很很多文字很多', {
        closeButton: {
        }
      })
    }
  }
})
