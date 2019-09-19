const expect = chai.expect
import Vue from 'vue'
import Input from "../src/Input"

describe('Input', () => {
  it('存在', () => {
    expect(Input).to.exist
  })

  describe('props', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('接收 value', () => {
      vm = new Constructor({
        propsData: {
          value: '这是一个value'
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.value).eq('这是一个value')
    })

    it('接收 disabled', () => {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const ele = vm.$el.querySelector('input')
      expect(ele.disabled).to.eq(true)
    })

    it('接收 readonly', () => {
      vm = new Constructor({
        propsData: {
          readonly: true
        }
      }).$mount()
      const ele = vm.$el.querySelector('input')
      expect(ele.readOnly).to.eq(true)
    })

    it('接收 error', () => {
      vm = new Constructor({
        propsData: {
          error: '接收错误信息'
        }
      }).$mount()
      const errorIcon = vm.$el.querySelector('use')
      const href = errorIcon.getAttribute('xlink:href')
      const errorMsg = vm.$el.querySelector('.errorMessage').innerHTML
      expect(href).to.eq('#i-error')
      expect(errorMsg).to.eq('接收错误信息')
    })
  })

  describe('events', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })

    it('支持 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur'].forEach(testEvent)
    })

    function testEvent(eventName) {
      vm = new Constructor({}).$mount()
      const callback = sinon.fake()
      vm.$on(eventName, callback)
      let event = new Event(eventName)
      let element = vm.$el.querySelector('input')
      element.dispatchEvent(event)
      expect(callback).to.have.been.calledWith(event)
    }
  })
})
