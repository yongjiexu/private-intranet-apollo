<template>
  <div class="content-wrapper">
    <h2 class="title">超大数据导出工单(数据导出上限为100000行，若超出请自行联系dba进行导出)</h2>
    <div class="form-wrapper">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="数据库类型" prop="selectedDb">
          <Select @on-change="handleSelectDbType">
            <Option value="mysql">mysql</Option>
            <Option value="pg">pg</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库" prop="selectedDb">
          <Select v-model="formValidate.selectedDb" @on-change="handleSelectDb">
            <Option v-for="(db,index) in dbs" :key="index" :value="db">{{db}}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库编号:" prop="selectedDbId">
          <Input disabled v-model="formValidate.selectedDbId"></Input>
        </FormItem>
        <FormItem label="owner:" prop="selectedDbOwnerInfo">
          <Input disabled v-model="formValidate.selectedDbOwnerInfo"></Input>
        </FormItem>
        <FormItem label="SQL:" prop="sqlStatement">
          <Input type="textarea" v-model="formValidate.sqlStatement"></Input>
        </FormItem>
        <FormItem label="详情描述:" prop="detailDesc">
          <Input type="textarea" v-model="formValidate.detailDesc"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "big-data",
    data() {
      return {
        dbs: [],
        dbUsers: [],
        dbOwnerIds: [],
        formValidate: {
          selectedDbType: "",
          selectedDb: "",
          selectedDbId: undefined,
          selectedDbOwnerInfo: "",
          sqlStatement: "",
          detailDesc: ""
        },
        ruleValidate: {
          selectedDbType: [
            {required: true, message: "请选择一个数据库", trigger: "blur"}
          ],
          selectedDb: [
            {required: true, message: "请选择一个数据库", trigger: "blur"}
          ],
          selectedDbId: [
            {
              type: "number",
              required: true,
              message: "请选择一个数据库id",
              trigger: "blur"
            }
          ],
          selectedDbOwnerInfo: [
            {required: true, message: "请选择数据库owner", trigger: "blur"}
          ],
          sqlStatement: [
            {required: true, message: "请选择一个数据库", trigger: "blur"}
          ],
          detailDesc: [
            {required: true, message: "请选择一个数据库", trigger: "blur"}
          ]
        }
      };
    },
    computed: {
      dbOwnersInfo: function () {
        return this.dbUsers.filter(dbUser => {
          for (let i = 0; i < this.dbOwnerIds.length; i++) {
            if (dbUser.id.toString() === this.dbOwnerIds[i]) {
              return true;
            }
          }
          return false;
        });
      },
      dbOwnersNameList: function () {
        return this.dbOwnersInfo
          .map(dbOwnerInfo => {
            return dbOwnerInfo.last_name;
          })
          .join(",");
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
      },
      async handleSelectDb(value) {
        console.log(value);
        //  选择数据库后，发请求拿到数据库编号、owner
        this.formValidate.selectedDbId = await this.$http.db.mysqlDbId.getDbId({
          alias: value
        });
        this.dbOwnerIds = await this.$http.auth.owner.get({
          alias: value
        });
        this.dbUsers = await this.$http.auth.user.get();
        this.formValidate.selectedDbOwnerInfo = this.dbOwnersNameList;
        console.log(this.selectedDbOwnerInfo);
      },
      async handleSelectDbType(value) {
        this.formValidate.selectedDbType = value;
        //  查询属于这种数据库类型的数据库
        if (value === "mysql") {
          this.dbs = await this.$http.db.mysqlDb.get({
            env: "prod"
          });
        } else {
          this.dbs = await this.$http.db.pgDb.get({
            env: "prod"
          });
        }
      },
      async handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$Message.success("Success!");
            debugger;
            // 验证成功，提交请求
            this.$http.auth.largeData.createLargeData({
              db_id: this.formValidate.selectedDbId,
              description: this.formValidate.detailDesc,
              sql: this.formValidate.sqlStatement,
              ticket_type: 4
            });
          } else {
            this.$Message.error("Fail!");
          }
        });
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
  .form-wrapper{
    width: 70%;
    margin: auto;
  }
</style>
