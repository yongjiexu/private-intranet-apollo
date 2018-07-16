// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
// import ElementUI from 'element-ui';

// 导入全局样式
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
// import '../src/common/style/normalize.css';
import '../src/common/style/reset.css';

import App from './App';
import router from './router';
import store from './store';
import services from "./api";
import eventBus from "./common/js/utils/bus";

Vue.use(iView);
// Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = services;
Vue.prototype.$eventBus = eventBus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
});
