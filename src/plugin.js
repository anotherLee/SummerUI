import Toast from "./Toast"
export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(msg) {
      const Constructor = Vue.extend(Toast)
      const toast = new Constructor({
        propsData: {
          closeButton: {
            text: '知道了',
            callback: function() {
              console.log('用记说它知道了')
            }
          }
        }
      })
      toast.$slots.default = [msg]
      toast.$mount()
      document.body.appendChild(toast.$el)
    }
  }
}
