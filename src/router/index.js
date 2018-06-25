import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/login/login';
import Layout from '../components/layout/layout';
import Query from '../components/query/query';
import OrderSubmission from "../components/order-submission/order-submission";

import DbAuthApply from '../components/db-auth-apply/db-auth-apply';
import DbRoleQuery from '../components/db-role-query/db-role-query';
import DbOwnerQueryAssign from '../components/db-owner-query-assign/db-owner-query-assign';
import BigDataOrder from '../components/big-data-order/big-data-order';

import OrderListInited from "../components/order-list-inited/order-list-inited";
import OrderListAssigned from "../components/order-list-assigned/order-list-assigned";
import OrderListRoleQuery from "../components/order-list-role-query/order-list-role-query";
import Dml from "../components/dml/dml";
import Ddl from "../components/ddl/ddl";
import SlowQeuryStatics from "../components/slow-query-statics/slow-query-statics";
import SlowQueryDetails from "../components/slow-query-details/slow-query-details";
import MysqlMonitor from "../components/mysql-monitor/mysql-monitor";
import localState from "../store";

Vue.use(VueRouter);

let localTabIndex = localState.state.tabIndex;
console.log(localTabIndex);

function routerViewName() {
  return `/index/query/mysql-stable-query?index=${localTabIndex.mysqlStableQueryIndex}`;
}

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
          path: '/index/query/mysql-query',
          components: {
            [`/index/query/mysql-query?index=0`]: Query
          }
        },
        {
          path: 'query/mysql-stable-query',
          components: {
            // 优化：可以提前准备5-10条，
            // 在当前存在的标签页超过这个数时再动态添加路由。
            // [`/index/query/mysql-stable-query?index=`]: Query
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
          path: 'db-auth-apply',
          component: DbAuthApply
        },
        {
          path: 'db-role-query',
          components: {
            dbRoleQuery: DbRoleQuery
          }
        },
        {
          path: 'db-owner-query-assign',
          components: {
            dbOwnerQueryAssign: DbOwnerQueryAssign
          }
        },
        {
          path: 'big-data-order',
          components: {
            bigDataOrder: BigDataOrder
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
