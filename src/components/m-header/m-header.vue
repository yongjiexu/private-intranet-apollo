<template>
  <div class="header-wrapper">
    <div class="logo">
      <div class="logo-content">Apollo</div>
    </div>
    <div class="nav-bar">
      <Menu mode="horizontal"
            theme="light"
            active-name="query" class="menu"
            @on-select="handleSelect">
        <Submenu name="query">
          <template slot="title">
            查询
          </template>
          <MenuItem name="mysql-query">MYSQL 查询</MenuItem>
          <MenuItem name="mysql-stable-query">MYSQL stable查询</MenuItem>
          <MenuItem name="pg-query">PG 查询</MenuItem>
          <MenuItem name="pg-stable-query">PG stable查询</MenuItem>
          <MenuItem name="tidb-query">TIDB 查询</MenuItem>
          <MenuItem name="tidb-stable-query">TIDB stable查询</MenuItem>
        </Submenu>
        <MenuItem name="submit-order">
          提交工单
        </MenuItem>
        <Submenu name="order-list">
          <template slot="title">
            工单列表
          </template>
          <MenuItem name="order-list-inited">我发起的</MenuItem>
          <MenuItem name="order-list-assigned">被指派的</MenuItem>
          <MenuItem name="order-list-role-query">角色查询</MenuItem>
        </Submenu>
        <MenuItem name="dml">DML</MenuItem>
        <MenuItem name="ddl">DDL变更工单</MenuItem>
        <Submenu name="slow-query">
          <template slot="title">
            慢查询
          </template>
          <MenuItem name="slow-query-statistics">慢查询统计</MenuItem>
          <MenuItem name="slow-query-detail">慢查询详情</MenuItem>
        </Submenu>
        <Submenu name="data-security">
          <template slot="title">
            数据安全
          </template>
          <MenuItem name="slow-query-statistics">审核列表</MenuItem>
          <MenuItem name="slow-query-detail">敏感数据</MenuItem>
        </Submenu>
        <Submenu name="data-monitor">
          <template slot="title">
            数据监控
          </template>
          <MenuItem name="mysql-monitor">MYSQL监控</MenuItem>
        </Submenu>
        <MenuItem name="collect-sql">
          收藏sql
        </MenuItem>
      </Menu>
    </div>
    <div class="user-center">用户中心</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';
  import Query from '../query/query';

  export default {
    name: 'm-header',
    computed: {
      ...mapState(['tabIndex'])
    },
    methods: {
      ...mapMutations({
        setTabContents: 'SET_TABCONTENTS',
        setCurrentActiveName: 'SET_CURRENT_ACTIVE_TAB_NAME',
        setTabIndex: 'SET_TAB_INDEX'
      }),
      handleSelect(name) {
        debugger;
        console.log(`in handleSelect ${name}`);
        switch (name) {
          case 'mysql-query':
            this.setTabIndex('mysqlQueryIndex');
            this.setTabContents({
              name: `/index/query/mysql-query?index=${this.tabIndex.mysqlQueryIndex}`,
              routerViewName: `/index/query/mysql-query?index=${this.tabIndex.mysqlQueryIndex}`,
              label: "MYSQL 查询"
            });
            this.setCurrentActiveName(`/index/query/mysql-query?index=${this.tabIndex.mysqlQueryIndex}`);
            // 维护一张动态的路由表，使同一个实例的对象渲染到不同的路由视图
            this.$router.options.routes[2].children[0].components[`/index/query/mysql-query?index=${this.tabIndex.mysqlQueryIndex}`] = Query;
            this.$router.push({
              path: '/index/query/mysql-query',
              query: {
                index: this.tabIndex.mysqlQueryIndex
              }
            });
            break;
          case 'mysql-stable-query':
            this.setTabIndex('mysqlStableQueryIndex');
            this.setTabContents({
              name: `/index/query/mysql-stable-query?index=${this.tabIndex.mysqlStableQueryIndex}`,
              routerViewName: `/index/query/mysql-stable-query?index=${this.tabIndex.mysqlStableQueryIndex}`,
              label: "MYSQL stable 查询"
            });
            this.setCurrentActiveName(`/index/query/mysql-stable-query?index=${this.tabIndex.mysqlStableQueryIndex}`);
            // 维护一张动态的路由表，使同一个实例的对象渲染到不同的路由视图
            this.$router.options.routes[2].children[1].components[`/index/query/mysql-stable-query?index=${this.tabIndex.mysqlStableQueryIndex}`] = Query;
            this.$router.push({
              path: '/index/query/mysql-stable-query',
              query: {
                index: this.tabIndex.mysqlStableQueryIndex
              }
            });
            break;
          case 'pg-query':
            this.$router.push({
              path: 'query/pg-query'
            });
            break;
          case 'pg-stable-query':
            this.$router.push({
              path: 'query/pg-stable-query'
            });
            break;
          case 'tidb-query':
            this.$router.push({
              path: 'query/tidb-query'
            });
            break;
          case 'tidb-stable-query':
            this.$router.push({
              path: 'query/tidb-stable-query'
            });
            break;
          case 'submit-order':
            this.$router.push({
              path: 'submit-order'
            });
            break;
          case 'order-list-inited':
            this.$router.push({
              path: 'order-list/order-list-inited'
            });
            break;
          case 'order-list-assigned':
            this.$router.push({
              path: 'order-list/order-list-assigned'
            });
            break;
          case 'order-list-role-query':
            this.$router.push({
              path: 'order-list/order-list-role-query'
            });
            break;
          case 'dml':
            this.$router.push({
              path: 'dml'
            });
            break;
          case 'ddl':
            this.$router.push({
              path: 'ddl'
            });
            break;
          case 'slow-query-statistics':
            this.$router.push({
              path: 'slow-query/slow-query-statics'
            });
            break;
          case 'slow-query-detail':
            this.$router.push({
              path: 'slow-query/slow-query-details'
            });
            break;
          case 'mysql-monitor':
            this.$router.push({
              path: 'data-monitor/mysql-monitor'
            });
            break;
          case 'collect-sql':
            this.$router.push({
              path: ''
            });
            break;
          default:
            alert("header中没有这个选项");
        }
      }
    }
  };
</script>

<style scoped>
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
    border-bottom: 2px solid #dddee1;
    margin-bottom: 6px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85px;
    height: 100%;
    font-size: 20px;
  }

  .ivu-menu-horizontal {
    height: 46px;
    line-height: 46px;
  }

  .ivu-menu {
    z-index: 5;
  }
</style>
