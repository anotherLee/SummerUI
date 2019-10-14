const expect = chai.expect
import Vue from 'vue'
import Tabs from "../src/tabs/Tabs"
import TabsHead from "../src/tabs/TabsHead"
import TabsBody from "../src/tabs/TabsBody"
import TabsItem from "../src/tabs/TabsItem"
import TabsPane from "../src/tabs/TabsPane"

Vue.component('s-tabs', Tabs)
Vue.component('s-tabs-head', TabsHead)
Vue.component('s-tabs-body', TabsBody)
Vue.component('s-tabs-item', TabsItem)
Vue.component('s-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
  it('存在.', () => {
    expect(TabsItem).to.be.ok
  })

  it('接受 name prop', () => {
    const Constructor = Vue.extend(TabsItem)
    const vm = new Constructor({
      propsData: {
        name: 'xx'
      }
    }).$mount()
    const name = vm.$el.getAttribute('data-name')
    expect(name).to.eq('xx')
  })

  it('接受 disabled prop', () => {
    const Constructor = Vue.extend(TabsItem)
    const spy = sinon.fake()
    const vm = new Constructor({
      propsData: {
        disabled: true
      }
    }).$mount()
    expect(vm.$el.classList.contains('disabled')).to.eq(true)
    vm.$on('click', spy)
    vm.$el.click()
    expect(spy).not.have.been.called
  })
})
