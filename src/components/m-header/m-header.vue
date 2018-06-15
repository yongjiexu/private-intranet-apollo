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
  import {mapMutations} from 'vuex';

  export default {
    name: 'm-header',
    methods: {
      ...mapMutations({
        setTabContents: 'SET_TABCONTENTS',
        setCurrentActiveName: 'SET_CURRENT_ACTIVE_TAB_NAME'
      }),
      handleSelect(name) {
        debugger
        console.log(`in handleSelect ${name}`);
        switch (name) {
          case 'mysql-query':
            // 渲染新tab
            this.setTabContents({
              name: 'mysql-query',
              routerViewName: 'querySlashMysqlQuery',
              label: 'MYSQL查询'
            });
            this.setCurrentActiveName('mysql-query');
            // 添加路由
            this.$router.push({
              path: '/index/query/mysql-query'
            });
            break;
          case 'mysql-stable-query':
            this.setTabContents({
              name: 'mysql-stable-query',
              routerViewName: 'querySlashMysqlStableQuery',
              label: "MYSQL stable 查询"
            });
            this.setCurrentActiveName('mysql-stable-query');
            this.$router.push({
              path: '/index/query/mysql-stable-query'
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
