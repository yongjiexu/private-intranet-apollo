<template>
  <div class="content-wrapper">
    <div class="header">
      <Button>新增DDL变更工单</Button>
      <a href="http://wiki.51.nb/pages/viewpage.action?pageId=52564161"
         target="view_window">(新版DDL使用指南)</a>
    </div>
    <div class="wrapper">
      <Tabs value="3"
            :animated="false"
            @on-click="handleTabClick">
        <TabPane label="待审批的" name="3">
          <Table border :columns="columns" :data="waitReviewDataForDisplay"></Table>
          <Page :total="waitReviewData.length" size="small" show-elevator show-sizer
                @on-change="handleWaitReviewChangePage"
                @on-page-size-change="handleWaitReviewPageSizeChange"></Page>
        </TabPane>
        <TabPane label="我发起的" name="1">
          <Table border :columns="columns" :data="iInitiateDataForDisplay"></Table>
          <Page :total="iInitiateData.length" size="small" show-elevator show-sizer
                @on-change="handleIInitChangePage"
                @on-page-size-change="handleIInitPageSizeChange">
          </Page>
        </TabPane>
        <TabPane label="与我有关" name="2">
          <Table border :columns="concernMeColumns" :data="concernMeDataForDisplay"></Table>
          <Page :total="concernMeData.length" size="small" show-elevator show-sizer
                @on-change="handleConcernMeChangePage"
                @on-page-size-change="handleConcernMePageSizeChange"></Page>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ddl",
    data() {
      return {
        columns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "状态",
            // 还要在转换一次最终展示的数据
            key: "stage"
          },
          {
            title: "数据库",
            key: "alias"
          },
          {
            title: "描述",
            key: "desc"
          },
          {
            title: "申请人",
            key: "username"
          },
          {
            title: "申请时间",
            key: "update_time"
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
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "手动提交sql"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "上线审核"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index);
                      }
                    }
                  },
                  "关闭"
                )
              ]);
            }
          }
        ],
        concernMeColumns: [
          {
            title: "编号",
            key: "id"
          },
          {
            title: "状态",
            // 还要在转换一次最终展示的数据
            key: "stage"
          },
          {
            title: "数据库",
            key: "alias"
          },
          {
            title: "描述",
            key: "desc"
          },
          {
            title: "申请人",
            key: "username"
          },
          {
            title: "申请时间",
            key: "update_time"
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
        waitReviewData: [],
        iInitiateData: [],
        concernMeData: [],
        waitReviewDataPageNum: 1,
        iInitiateDataPageNum: 1,
        concernMeDataPageNum: 1,
        waitReviewDataPageSize: 10,
        iInitiateDataPageSize: 10,
        concernMeDataPageSize: 10
      };
    },
    computed: {
      waitReviewDataForDisplay: function() {
        let startIndex =
          this.waitReviewDataPageSize * (this.waitReviewDataPageNum - 1);
        let endIndex = startIndex + (this.waitReviewDataPageSize - 1);
        if (endIndex > this.waitReviewData.length) {
          endIndex = this.waitReviewData.length;
        }
        return this.waitReviewData.slice(startIndex, endIndex);
      },
      iInitiateDataForDisplay: function() {
        let startIndex =
          this.iInitiateDataPageSize * (this.iInitiateDataPageNum - 1);
        let endIndex = startIndex + (this.iInitiateDataPageSize - 1);
        if (endIndex > this.iInitiateData.length) {
          endIndex = this.iInitiateData.length;
        }
        return this.iInitiateData.slice(startIndex, endIndex);
      },
      concernMeDataForDisplay: function() {
        let startIndex =
          this.concernMeDataPageSize * (this.concernMeDataPageNum - 1);
        let endIndex = startIndex + (this.concernMeDataPageSize - 1);
        if (endIndex > this.concernMeData.length) {
          endIndex = this.concernMeData.length;
        }
        return this.concernMeData.slice(startIndex, endIndex);
      }
    },
    methods: {
      test() {
        console.log("just for test");
      },
      handleWaitReviewChangePage(pageNum) {
        console.log(`你选择展示第${pageNum}页`);
        this.waitReviewDataPageNum = pageNum;
      },
      handleWaitReviewPageSizeChange(pageSize) {
        console.log(`你选择每页展示${pageSize}条数据`);
        this.waitReviewDataPageSize = pageSize;
      },
      handleIInitChangePage(pageNum) {
        console.log(`你选择展示第${pageNum}页`);
        this.iInitiateDataPageNum = pageNum;
      },
      handleIInitPageSizeChange(pageSize) {
        console.log(`你选择每页展示${pageSize}条数据`);
        this.iInitiateDataPageSize = pageSize;
      },
      handleConcernMeChangePage(pageNum) {
        console.log(`你选择展示第${pageNum}页`);
        this.concernMeDataPageNum = pageNum;
      },
      handleConcernMePageSizeChange(pageSize) {
        console.log(`你选择每页展示${pageSize}条数据`);
        this.concernMeDataPageSize = pageSize;
      },
      async handleTabClick(tabName) {
        console.log(`你点击了${tabName}标签页`);
        //  每次点击标签页都要重新发请求获取新数据
        if (tabName === "3") {
          this.waitReviewData = await this.$http.db.mysqlIssueListThree.getIssueListThree();
        } else if (tabName === "1") {
          this.iInitiateData = await this.$http.db.mysqlIssueListOne.getIssueListOne();
        } else {
          this.concernMeData = await this.$http.db.mysqlIssueListTwo.getIssueListTwo();
        }
      },
      async init() {
        this.waitReviewData = await this.$http.db.mysqlIssueListThree.getIssueListThree();
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
  .content-wrapper {
    width: 98%;
    margin: auto
  }
</style>
