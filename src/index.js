import Vue from 'vue'
import Button from './Button.vue'
import Icon from './Icon.vue'
import ButtonGroup from './ButtonGroup.vue'
import Input from './Input'

Vue.component('s-button', Button)
Vue.component('s-icon', Icon)
Vue.component('s-button-group', ButtonGroup)
Vue.component('s-input', Input)


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
