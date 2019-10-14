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

describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.be.ok
  })

  it('接受 selected prop', (done) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
      <s-tabs selected="tab2">
        <s-tabs-head>
          <s-tabs-item name="tab1">tab1</s-tabs-item>
          <s-tabs-item name="tab2">tab2</s-tabs-item>
          <s-tabs-item name="tab3">tab3</s-tabs-item>
        </s-tabs-head>
        <s-tabs-body>
          <s-tabs-pane name="tab1">tab1 content</s-tabs-pane>
          <s-tabs-pane name="tab2">tab2 content</s-tabs-pane>
          <s-tabs-pane name="tab3">tab3 content</s-tabs-pane>
        </s-tabs-body>
      </s-tabs>
    `
    const vm = new Vue({
      el: div
    })

    vm.$nextTick(() => {
      const el = vm.$el.querySelector(`.s-tabs-item[data-name='tab2']`)
      expect(el).to.exist
      done()
    })
  })

  it('接收 direction prop', () => {

  })
})
