import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/login/login';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    }
  ]
});
