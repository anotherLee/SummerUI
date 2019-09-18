import Vue from 'vue'
import Button from './s-button.vue'
import Icon from './s-icon.vue'
import ButtonGroup from './s-button-group.vue'
import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)

Vue.component('s-button', Button)
Vue.component('s-icon', Icon)
Vue.component('s-button-group', ButtonGroup)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false
  }
})

const expect = chai.expect
// 单元测试
{
  const constructor = Vue.extend(Button)
  const button = new constructor({
    propsData: {
      icon: 'setting'
    }
  })
  button.$mount()
  let useElement = button.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#i-setting')

  button.$el.remove()
  button.$destroy()
}

{
  const constructor = Vue.extend(Button)
  const button = new constructor({
    propsData: {
      icon: 'left',
      loading: true
    }
  })

  button.$mount()
  let useElement = button.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#i-loading')

  button.$el.remove()
  button.$destroy()
}

{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const constructor = Vue.extend(Button)
  const button = new constructor({
    propsData: {
      icon: 'setting'
    }
  })
  button.$mount(div)
  let svg = button.$el.querySelector('svg')
  let { order } = window.getComputedStyle(svg)
  expect(order).to.eq('1')

  button.$el.remove()
  button.$destroy()
}

{
  // 这个测试用例需要使用mock
  let div = document.createElement('div')
  document.body.appendChild(div)
  const constructor = Vue.extend(Button)
  const vm = new constructor({
    propsData: {
      icon: 'setting'
    }
  })
  vm.$mount(div)

  let spy = chai.spy(function(){})
  vm.$on('click', spy)
  let button = vm.$el
  button.click()
  expect(spy).to.have.been.called()
}
