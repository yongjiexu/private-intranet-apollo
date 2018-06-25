<template>
  <div class="content-wrapper">
    <h2 class="title">提交工单</h2>
    <div class="seprator"></div>
    <div class="box">
      <div class="column">
        <Card @click.native="handleDbAuthApply('dbAuthApplyIndex','/index/db-auth-apply')">
          <p slot="title">数据库权限申请</p>
          <p>数据库查询权限相关申请</p>
        </Card>
        <Card @click.native="handleDbRoleQuery('dbRoleQueryIndex','/index/db-role-query')">
          <p slot="title">数据库角色分配</p>
          <p>数据库角色查询和分配</p>
        </Card>
      </div>
      <div class="column">
        <Card @click.native="handleDbOwnerQueryAndAssign('dbOwnerQueryAssignIndex','/index/db-owner-query-assign')">
          <p slot="title">数据库Owner分配</p>
          <p>数据库Owner查询和分配</p>
        </Card>
        <Card @click.native="handleBigDataOrder('bigDataOrderIndex','/index/big-data-order')">
          <p slot="title">大数据工单</p>
          <p>超大数据导出工单</p>
        </Card>
      </div>
      <div class="column">
        <Card @click.native="handleDdlPublishProcedure('ddlIndex','/index/ddl')">
          <p slot="title">DDL变更工单</p>
          <p>DDL发布流程</p>
        </Card>
        <Card @click.native="handleDmlPublishProcedure('dmlIndex','/index/dml')">
          <p slot="title">DML</p>
          <p>DML发布流程</p>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    name: "order-submission",
    computed: {
      ...mapState(['currentActiveTabName', 'tabContents', 'tabIndex'])
    },
    methods: {
      ...mapMutations({
        setCurrentActiveTabName: 'SET_CURRENT_ACTIVE_TAB_NAME',
        setTabContentRouteAndName: 'setTabContentRouteAndName',
        setTabIndex: 'SET_TAB_INDEX'
      }),
      /**
       * 处理提交工单选项被点击后的逻辑
       * @param index 工单选项对应的index
       * @param path 点击工单选项后将要打开的页面的path
       */
      handleClickOption(index, path) {
        console.log(this.$route);
        let tabIndex = -1;
        this.tabContents.forEach((tab, index) => {
          if (tab.name === this.currentActiveTabName) {
            tabIndex = index;
          }
        });
        debugger;
        this.setTabIndex(`${index}`);
        this.$router.replace({
          path: `${path}`,
          query: {
            index: this.tabIndex[index]
          }
        });
        this.setTabContentRouteAndName({
          tabIndex,
          newRoute: `${path}?index=${this.tabIndex[index]}`,
          newName: `${path}?index=${this.tabIndex[index]}`
        });
        this.setCurrentActiveTabName(`/index/${path}?index=${this.tabIndex[index]}`);
      },
      handleDbAuthApply(dbAuthApplyIndex, dbAuthApplyPath) {
        this.handleClickOption(dbAuthApplyIndex, dbAuthApplyPath);
      },
      handleDbRoleQuery(dbRoleQueryIndex, dbRoleQueryPath) {
        this.handleClickOption(dbRoleQueryIndex, dbRoleQueryPath);
      },
      handleDbOwnerQueryAndAssign(dbOwnerQueryAssignIndex, dbOwnerQueryAssignPath) {
        this.handleClickOption(dbOwnerQueryAssignIndex, dbOwnerQueryAssignPath);
      },
      handleBigDataOrder(bigDataOrderIndex, bigDataOrderPath) {
        this.handleClickOption(bigDataOrderIndex, bigDataOrderPath);
      },
      handleDdlPublishProcedure(ddlIndex, ddlPath) {
        this.handleClickOption(ddlIndex, ddlPath);
      },
      handleDmlPublishProcedure(dmlIndex, dmlPath) {
        this.handleClickOption(dmlIndex, dmlPath);
      }
    }
  };
</script>

<style scoped>
  .content-wrapper {
    width: 90%;
    margin: auto
  }

  .title {
    margin-bottom: 20px;
    padding-top: 26px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 18px;
  }

  .box {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 70%;
    margin: auto;
  }

  .column {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
  }

  .ivu-card {
    width: 40%;
    height: 115px;
    margin-bottom: 15px;
    background: #ECECEC;
  }

  >>> .ivu-card-head {
    text-align: center;
    background: white;
  }

  >>> .ivu-card-body {
    text-align: center;
  }

  .ivu-card-body p {
    margin-top: 8px;
  }
</style>
