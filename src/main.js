// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';
import services from "./api";

Vue.use(iView);
Vue.config.productionTip = false;
Vue.prototype.$http = services;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  template: '<App/>'
});
