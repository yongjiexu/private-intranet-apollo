export default {
  //todo 使用数组维护数据 和 使用对象维护数据 的优缺点
  currentActiveTabName: '',
  /* 在vuex中维护 同一个标签被打开次数 的 对象
  当tab被打开时，对应index自增一，作为查询参数，推入路由
   */
  tabIndex: {
    // 默认打开的tab，从零开始计数
    mysqlQueryIndex: -1,
    mysqlStableQueryIndex: -1,
    pgQueryIndex: -1,
    pgStableQueryIndex: -1,
    tidbQueryIndex: -1,
    tidbStableQueryIndex: -1,
    submitOrderIndex: -1,
    orderListInitedIndex: -1,
    orderListAssignedIndex: -1,
    orderListRoleQueryIndex: -1,
    dmlIndex: -1,
    ddlIndex: -1,
    slowQueryStatisticsIndex: -1,
    slowQueryDetailIndex: -1,
    mysqlMonitorIndex: -1
  },
  tabContents: [
    {
      // 传给TabPane，作为TabPane的name，给程序员用
      name: '/index/query/mysql-query?index=0',
      // 当前内容的路由出口的，即命名视图的名字
      routerViewName: '/index/query/mysql-query?index=0',
      // 传给TabPane，作为TabPane的标签标志，给用户看
      label: 'MYSQL查询'
    }
  ]
};
