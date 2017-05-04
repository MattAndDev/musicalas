import Vue from 'vue'
import App from './app.vue'
import router from './router'

// $.ready
let domReady = function (callback) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback)
}

domReady(() => {
  Vue.config.devtools = false

  const app = new Vue({
    el: '#App',
    router,
    template: '<App/>',
    components: { App }
  })
})
