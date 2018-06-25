<template>
  <div class="content-wrapper">
    <h1 class="title">角色查询</h1>
    <div class="wrapper">
      <Form class="form"
            ref="formValiwatcher"
            :model="formValiwatcher"
            :label-width="80"
            :rules="ruleValiwatcher">
        <FormItem label="数据库" prop="selectedDb">
          <Select v-model="formValiwatcher.selectedDb" @on-change="handleChangeDb">
            <Option v-for="(db,index) in dbs" :key="index" :value="db">{{db}}</Option>
          </Select>
        </FormItem>
      </Form>
      <Table :columns="columns" :data="roleData"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    owner: "ticketsRoleQuery",
    data() {
      return {
        columns: [
          {
            title: "owner",
            key: "owner"
          },
          {
            title: "开发人员",
            key: "developer"
          },
          {
            title: "测试人员",
            key: "tester"
          },
          {
            title: "查看人员",
            key: "watcher"
          }
        ],
        roleData: [],
        dbs: [],
        dbId: "",
        roleList: {},
        users: [],
        developers: {},
        testers: {},
        formValiwatcher: {
          selectedDb: ""
        },
        ruleValiwatcher: {
          selectedDb: [
            {required: true, messdeveloper: "请选择一个数据库", trigger: "blur"}
          ]
        }
      };
    },
    computed: {},
    methods: {
      async init() {
        this.dbs = await this.$http.db.mysqlDb.get({
          env: "TEMP"
        });
      },
      async handleChangeDb(db) {
        console.log(`你选择了${db}数据库`);
        this.dbId = await this.$http.db.mysqlDbId.getDbId({
          alias: db
        });
        this.roleList = await this.$http.auth.roleList.get({
          alias: db
        });
        this.users = await this.$http.auth.user.get();
        this.developers = await this.$http.auth.role.get({
          alias: db,
          type: "developer",
          db_id: this.dbId
        });
        this.testers = await this.$http.auth.role.get({
          alias: db,
          type: "tester",
          db_id: this.dbId
        });

        //  计算要展示的数据
        let resultData = [];
        let resultMessage = {};

        let devIdList =
          this.roleList.dev === null ? [] : this.roleList.dev.split(",");
        let ownerIdList =
          this.roleList.owner === null ? [] : this.roleList.owner.split(",");
        let testIdList =
          this.roleList.test === null ? [] : this.roleList.test.split(",");
        let watcherIdList =
          this.roleList.watcher === null ? [] : this.roleList.watcher.split(",");

        // todo 再抽一个函数
        let devList = this.users.filter(user => {
          for (let i = 0; i < devIdList.length; i++) {
            if (user.id.toString() === devIdList[i]) {
              return true;
            }
          }
          return false;
        });

        let ownerList = this.users.filter(user => {
          for (let i = 0; i < ownerIdList.length; i++) {
            if (user.id.toString() === ownerIdList[i]) {
              return true;
            }
          }
          return false;
        });

        let testList = this.users.filter(user => {
          for (let i = 0; i < testIdList.length; i++) {
            if (user.id.toString() === testIdList[i]) {
              return true;
            }
          }
          return false;
        });

        let watcherList = this.users.filter(user => {
          for (let i = 0; i < watcherIdList.length; i++) {
            if (user.id.toString() === watcherIdList[i]) {
              return true;
            }
          }
          return false;
        });

        resultMessage.owner = ownerList
          .map(dev => {
            return `${dev.last_name}(${dev.username})`;
          })
          .join(",");
        resultMessage.developer = devList
          .map(dev => {
            return `${dev.last_name}(${dev.username})`;
          })
          .join(",");
        resultMessage.tester = testList
          .map(dev => {
            return `${dev.last_name}(${dev.username})`;
          })
          .join(",");
        resultMessage.watcher = watcherList
          .map(dev => {
            return `${dev.last_name}(${dev.username})`;
          })
          .join(",");

        resultData.push(resultMessage);
        this.roleData = resultData;
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped>
  .content-wrapper {
    width: 96.5%;
    margin: auto;
  }

  .form {
    width: 40%;
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
