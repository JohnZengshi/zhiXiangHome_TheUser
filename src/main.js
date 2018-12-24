/** Created by John on 2018年12月24日09:30:37 */

import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false;
App.mpType = 'app'
Vue.prototype.globalData = store.state.globalStore; //设置全局变量
const app = new Vue({
  store,
  ...App
})

app.$mount()