
import Vue from 'vue'
import Button from './s-button.vue'
import Icon from './s-icon.vue'

Vue.component('s-button', Button)
Vue.component('s-icon', Icon)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false
  }
})
