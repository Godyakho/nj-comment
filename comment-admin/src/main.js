// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'http://127.0.0.1:7001/')

Vue.use(ElementUI)

Vue.config.productionTip = false

// 拦截请求
router.beforeEach((to, from, next) => {
  // 用户登录拦截
  if (to.path.indexOf('/login') > -1) {
    next({path: '/'})
  }
  let login = sessionStorage.getItem('login')
  if (!login && to.path.indexOf('/list') > -1) {
    next({ path: '/' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    res: function (val) {
      console.log('接收到服务端消息', val)
    }
  }
})
