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


new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    inputValue: ''
  },
  methods: {
    inputChange(e) {
      console.log(1)
      console.log(e)
    }
  }
})
