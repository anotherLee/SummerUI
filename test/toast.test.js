const expect = chai.expect
import Vue from 'vue'
import Toast from '../src/toast/Toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
  it('存在', () => {
    expect(Toast).to.exist
  })

  describe('props', () => {
    it('接受 autoClose', (done) => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          autoClose: 1,
        }
      }).$mount(div)
      setTimeout(() => {
        expect(document.body.contains(vm.$el)).to.eq(false)
        done()
      }, 1500)
    })

    it('接受 closeButton', (done) => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Toast)
      const spy = sinon.fake()
      const vm = new Constructor({
        propsData: {
          closeButton: {
            text: '关闭吧',
            callback: spy
          },
        }
      }).$mount(div)
      const needClick = vm.$el.querySelector('.close')
      expect(needClick.innerHTML.trim()).to.eq('关闭吧')
      needClick.click()
      expect(spy).to.have.been.called
      done()
    })

    it('接受enableHtml', () => {
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          enableHtml: true
        }
      })
      vm.$slots.default = ['<strong id="test">hi</strong>']
      vm.$mount()
      let strong = vm.$el.querySelector('#test')
      expect(strong).to.exist
    })

    it('接受position', () => {
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          position: 'bottom'
        }
      }).$mount()
      expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
    })
  })
})
