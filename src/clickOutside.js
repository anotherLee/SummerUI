export default {
  bind: function (el, binding) {
    function handler(e) {
      if (el.contains(e.target)) return
      binding.value()
    }

    el.handler = handler
    document.addEventListener('click', handler)
  },
  unbind(el) {
    document.removeEventListener('click', el.handler)
    delete el.handler
  }
}
