import Toast from "./Toast"

let currentToast

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (msg, toastOptions) {
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast({
        Vue,
        msg,
        propsData: toastOptions,
        onClose: () => {
          currentToast = null
        }
      })
    }
  }
}

const createToast = ({ Vue, msg, propsData, onClose }) => {
  const Constructor = Vue.extend(Toast)
  const toast = new Constructor({
    propsData
  })
  toast.$slots.default = [msg]
  toast.$on('close', onClose)
  toast.$mount()
  document.body.appendChild(toast.$el)
  return toast
}

