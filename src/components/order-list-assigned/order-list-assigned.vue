<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="title">指派给我的（ddl工单请筛选查看）</h1>
    </div>
    <div class="wrapper">
      <Select v-model="ticketType" style="width:200px" @on-change="handleChangeTicketType">
        <Option value="all">全部</Option>
        <Option value="newVersionDDL">新版DDL</Option>
        <Option value="3">DML</Option>
        <Option value="1">申请查看权限</Option>
        <Option value="2">申请owner权限</Option>
        <Option value="4">大数据导出工单</Option>
      </Select>
      <Tabs :animated="false"
            v-model="state"
            @on-click="handleTabClick">
        <TabPane label="待审批" name="audit">
          <Table border :columns="columns" :data="auditDataForDisplay"></Table>
          <Page :total="auditData.length" size="small" show-elevator show-sizer
                @on-change="handleAuditDataChangePage"
                @on-page-size-change="handleAuditDataPageSizeChange"></Page>
        </TabPane>
        <TabPane label="全部" name="all">
          <Table border :columns="columns" :data="allDataForDisplay"></Table>
          <Page :total="allData.length" size="small" show-elevator show-sizer
                @on-change="handleAllDataChangePage"
                @on-page-size-change="handleAllDataPageSizeChange"></Page>
        </TabPane>
        <TabPane label="未完成" name="notFinished">
          <Table border :columns="columns" :data="notFinishedDataForDisplay"></Table>
          <Page :total="notFinishedData.length" size="small" show-elevator show-sizer
                @on-change="handleNotFinishedChangePage"
                @on-page-size-change="handleNotFinishedPageSizeChange">
          </Page>
        </TabPane>
        <TabPane label="已完成" name="processed">
          <Table border :columns="columns" :data="processedDataForDisplay"></Table>
          <Page :total="processedData.length" size="small" show-elevator show-sizer
                @on-change="handleProcessedDataChangePage"
                @on-page-size-change="handleProcessedDataPageSizeChange"></Page>
        </TabPane>
        <TabPane label="已关闭" name="close">
          <Table border :columns="columns" :data="closedDataForDisplay"></Table>
          <Page :total="closedData.length" size="small" show-elevator show-sizer
                @on-change="handleClosedDataChangePage"
                @on-page-size-change="handleClosedDataPageSizeChange"></Page>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ticketsInitedByMe",
    data() {
      return {
        ticketType: "all",
        state: "audit",
        columns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "标题",
            key: "title"
          },
          {
            title: "状态",
            key: "state"
          },
          {
            title: "类型",
            key: "ticket_type"
          },
          {
            title: "描述",
            key: "description"
          },
          {
            title: "申请人",
            key: "assignedor"
          },
          {
            title: "申请时间",
            key: "created_at"
          },
          {
            title: "操作",
            // 看文档，怎么往表格中插内容，slot？
            key: "age",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        console.log("你点击了查看按钮");
                        // 在这里，this指向vue实例
                        console.log(this.test());
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        ],
        auditData: [],
        allData: [],
        notFinishedData: [],
        processedData: [],
        closedData: [],
        auditDataPageNum: 1,
        allDataPageNum: 1,
        notFinishedDataPageNum: 1,
        processedDataPageNum: 1,
        closedDataPageNum: 1,
        auditDataPageSize: 10,
        allDataPageSize: 10,
        notFinishedDataPageSize: 10,
        processedDataPageSize: 10,
        closedDataPageSize: 10
      };
    },
    computed: {
      auditDataForDisplay: function () {
        let startIndex = this.auditDataPageSize * (this.auditDataPageNum - 1);
        let endIndex = startIndex + this.auditDataPageSize;
        if (endIndex > this.auditData.length) {
          endIndex = this.auditData.length;
        }
        return this.auditData.slice(startIndex, endIndex);
      },
      allDataForDisplay: function () {
        let startIndex = this.allDataPageSize * (this.allDataPageNum - 1);
        let endIndex = startIndex + this.allDataPageSize;
        if (endIndex > this.allData.length) {
          endIndex = this.allData.length;
        }
        return this.allData.slice(startIndex, endIndex);
      },
      notFinishedDataForDisplay: function () {
        let startIndex =
          this.notFinishedDataPageSize * (this.notFinishedDataPageNum - 1);
        let endIndex = startIndex + this.notFinishedDataPageSize;
        if (endIndex > this.notFinishedData.length) {
          endIndex = this.notFinishedData.length;
        }
        return this.notFinishedData.slice(startIndex, endIndex);
      },
      processedDataForDisplay: function () {
        let startIndex =
          this.processedDataPageSize * (this.processedDataPageNum - 1);
        let endIndex = startIndex + this.processedDataPageSize;
        if (endIndex > this.processedData.length) {
          endIndex = this.processedData.length;
        }
        return this.processedData.slice(startIndex, endIndex);
      },
      closedDataForDisplay: function () {
        let startIndex = this.closedDataPageSize * (this.closedDataPageNum - 1);
        let endIndex = startIndex + this.closedDataPageSize;
        if (endIndex > this.closedData.length) {
          endIndex = this.closedData.length;
        }
        return this.closedData.slice(startIndex, endIndex);
      }
    },
    methods: {
      test() {
        console.log("just for test");
      },
      handleAllDataChangePage(pageNum) {
        console.log(`你选择展示第${pageNum}页`);
        this.allDataPageNum = pageNum;
      },
      handleAllDataPageSizeChange(pageSize) {
        console.log(`你选择每页展示${pageSize}条数据`);
        this.allDataPageSize = pageSize;
      },
      handleNotFinishedChangePage(pageNum) {
        console.log(`你选择展示第${pageNum}页`);
        this.notFinishedDataPageNum = pageNum;
      },
      handleNotFinishedPageSizeChange(pageSize) {
        console.log(`你选择每页展示${pageSize}条数据`);
        this.notFinishedDataPageSize = pageSize;
      },
      handleProcessedDataChangePage(pageNum) {
        console.log(`你选择展示第${pageNum}页`);
        this.processedDataPageNum = pageNum;
      },
      handleProcessedDataPageSizeChange(pageSize) {
        console.log(`你选择每页展示${pageSize}条数据`);
        this.processedDataPageSize = pageSize;
      },
      handleClosedDataChangePage(pageNum) {
        this.closedDataPageNum = pageNum;
      },
      handleClosedDataPageSizeChange(pageSize) {
        this.closedDataPageSize = pageSize;
      },
      handleChangeTicketType(ticketType) {
        console.log(`you have choose ticket type ${ticketType}`);
        //  在这里，根据ticketType && state 决定发什么请求，取回的数据放在哪个变量中。
        this.sendRequest();
      },
      async handleTabClick(state) {
        //  在这里，根据ticketType && state 决定发什么请求，取回的数据放在哪个变量中
        this.sendRequest();
      },
      async init() {
        this.auditData = await this.$http.db.tickets.get({
          type: "assigned",
          ticket_type: "all",
          state: this.state
        });
      },
      async sendRequest() {
        if (this.ticketType === "newVersionDDL") {
          if (this.state === "audit") {
            this.auditData = await this.$http.db.mysqlIssueListThree.getIssueListThree();
          } else if (this.state === "all") {
            this.allData = await this.$http.db.mysqlIssueListOne.getIssueListOne();
          } else if (this.state === "notFinished") {
            this.notFinishedData = await this.$http.db.mysqlIssueListFour.getIssueListFour();
          } else if (this.state === "processed") {
            this.processedData = await this.$http.db.mysqlIssueListFive.getIssueListFive();
          } else {
            this.closedData = await this.$http.db.mysqlIssueListSix.getIssueListSix();
          }
        } else {
          //  在这里统一发tickets请求
          // 还能再优化，去掉分支。 思路：动态取出属性值，例如this[`${this.state}Data`]
          if (this.state === "audit") {
            this.auditData = await this.$http.db.tickets.get({
              type: "assigned",
              ticket_type: this.ticketType,
              state: this.state
            });
          } else if (this.state === "all") {
            this.allData = await this.$http.db.tickets.get({
              type: "assigned",
              ticket_type: this.ticketType,
              state: this.state
            });
          } else if (this.state === "notFinished") {
            this.notFinishedData = await this.$http.db.tickets.get({
              type: "assigned",
              ticket_type: this.ticketType,
              state: this.state
            });
          } else if (this.state === "processed") {
            this.processedData = await this.$http.db.tickets.get({
              type: "assigned",
              ticket_type: this.ticketType,
              state: this.state
            });
          } else {
            this.closedData = await this.$http.db.tickets.get({
              type: "assigned",
              ticket_type: this.ticketType,
              state: this.state
            });
          }
        }
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
  .wrapper {
    width: 99%;
    margin: auto;
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
</style>
