// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//简单的三行代码已经可以把Vant引入进来了，但是这并不够优雅，也使得最后打包发布时会增加包的大小，Vue的SPA首屏打开时本来就有些慢，所以不建议使用这种方法进行引入。


import { Button, Row, Col ,Search , Swipe , SwipeItem , Lazyload  } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
