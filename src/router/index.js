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
import MysqlMonitor from "../components/mysql-monitor/mysql-monitor";

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
          components: {
            querySlashMysqlQuery: Query
          }
        },
        {
          path: 'query/mysql-stable-query',
          components: {
            querySlashMysqlStableQuery: Query
          }
        },
        {
          path: 'query/pg-query',
          components: {
            querySlashPgQuery: Query
          }
        },
        {
          path: 'query/pg-stable-query',
          components: {
            querySlashPgStableQuery: Query
          }
        },
        {
          path: 'query/tidb-query',
          components: {
            querySlashTidbQuery: Query
          }
        },
        {
          path: 'query/tidb-stable-query',
          components: {
            queryTidbStableQuery: Query
          }
        },
        // 提交工单路由
        {
          path: 'submit-order',
          components: {
            submitOrder: OrderSubmission
          }
        },
        {
          path: 'order-list/order-list-inited',
          components: {
            orderListSlashOrderListInited: OrderListInited
          }
        },
        {
          path: 'order-list/order-list-assigned',
          components: {
            orderListSlashOrderListAssigned: OrderListAssigned
          }
        },
        {
          path: 'order-list/order-list-role-query',
          components: {
            orderListSlashOrderListRoleQuery: OrderListRoleQuery
          }
        },
        {
          path: 'dml',
          components: {
            dml: Dml
          }
        },
        {
          path: 'ddl',
          components: {
            ddl: Ddl
          }
        },
        {
          path: 'slow-query/slow-query-statics',
          components: {
            slowQuerySlowQueryStatics: SlowQeuryStatics
          }
        },
        {
          path: 'slow-query/slow-query-details',
          components: {
            slowQuerySlashSlowQueryDetails: SlowQueryDetails
          }
        },
        {
          path: 'data-monitor/mysql-monitor',
          component: {
            dataMonitorSlashMysqlMonitor: MysqlMonitor
          }
        }
        // ...其他子路由
      ]
    }
  ]
});
