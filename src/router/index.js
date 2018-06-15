import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/login/login';
import Layout from '../components/layout/layout';
import Query from '../components/query/query';
import OrderSubmission from "../components/order-submission/order-submission";
import OrderListInited from "../components/order-list-inited/order-list-inited";
import OrderListAssigned from "../components/order-list-assigned/order-list-assigned";
import OrderListRoleQuery from "../components/order-list-role-query/order-list-role-query";
import Dml from "../components/dml/dml";
import Ddl from "../components/ddl/ddl";
import SlowQeuryStatics from "../components/slow-query-statics/slow-query-statics";
import SlowQueryDetails from "../components/slow-query-details/slow-query-details";
import MysqlMonitor from "../components/mysql-monitor/mysql-monitor"
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/llogin',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Layout',
      component: Layout,
      children: [
        // 查询路由
        {
          path: 'query/mysql-query',
          component: Query
        },
        {
          path: 'query/mysql-stable-query',
          component: Query
        },
        ,
        {
          path: 'query/pg-query',
          component: Query
        },
        {
          path: 'query/pg-stable-query',
          component: Query
        },
        {
          path: 'query/tidb-query',
          component: Query
        },
        {
          path: 'query/tidb-stable-query',
          component: Query
        },
        // 提交工单路由
        {
          path: 'submit-order',
          component: OrderSubmission
        },
        {
          path: 'order-list/order-list-inited',
          component: OrderListInited
        },
        {
          path: 'order-list/order-list-assigned',
          component: OrderListAssigned
        },
        {
          path: 'order-list/order-list-role-query',
          component: OrderListRoleQuery
        },
        {
          path: 'dml',
          component: Dml
        },
        {
          path: 'ddl',
          component: Ddl
        },
        {
          path: 'slow-query/slow-query-statics',
          component: SlowQeuryStatics
        },
        {
          path: 'slow-query/slow-query-details',
          component: SlowQueryDetails
        },
        {
          path: 'data-monitor/mysql-monitor',
          component: MysqlMonitor
        }
        // ...其他子路由
      ]
    }
  ]
});
