const expect = chai.expect
import Vue from 'vue'
import Popover from "../src/Popover"
import Button from "../src/Button"

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
  it('存在.', () => {
    expect(Popover).to.be.ok
  })

  it('可以设置position', (done) => {
    Vue.component('s-popover', Popover)
    Vue.component('s-button', Button)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
      <s-popover ref="pop">
        <template v-slot:content>
          弹出内容 
        </template>
        <template v-slot:default>
          <s-button>点我</s-button> 
        </template>
      </s-popover>
    `
    const vm = new Vue({
      el: div
    })
    const popover = vm.$refs.pop
    vm.$el.querySelector('button').click()
    vm.$nextTick(() => {
      expect(vm.$refs.pop.$refs.contentWrapper.classList.contains('position-top')).to.eq(true)
      done()
    })
  })

  it('可以设置trigger', (done) => {
    Vue.component('s-popover', Popover)
    Vue.component('s-button', Button)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
      <s-popover ref="pop" trigger="hover">
        <template v-slot:content>
          弹出内容 
        </template>
        <template v-slot:default>
          <s-button>点我</s-button> 
        </template>
      </s-popover>
    `
    const vm = new Vue({
      el: div
    })
    const popover = vm.$refs.pop
    const event = new Event('mouseenter')
    popover.$refs.popover.dispatchEvent(event)
    popover.$nextTick(() => {
      expect(popover.$refs.contentWrapper).to.exist
      done()
    })
  })
})
