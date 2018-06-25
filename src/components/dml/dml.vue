<template>
  <div class="content-wrapper">
    <h2 class="title">DML-工单提交(Stable环境不执行)</h2>
    <div class="form-wrapper">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
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
        <FormItem label="影响行数" prop="affectedRowNums">
          <Input v-model="formValidate.affectedRowNums"></Input>
        </FormItem>
        <FormItem label="DML:" prop="dmlStatement">
          <Input type="textarea" v-model="formValidate.dmlStatement"></Input>
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
    name: "dml",
    data() {
      return {
        dbs: [], // use
        dbUsers: [],
        dbOwnerIds: [],
        formValidate: {
          selectedDb: "", // use
          selectedDbId: undefined, // use
          selectedDbOwnerInfo: "", // use
          affectedRowNums: "", // use
          dmlStatement: "",
          detailDesc: ""
        },
        ruleValidate: {
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
          dmlStatement: [
            {required: true, message: "请选择一个数据库", trigger: "blur"}
          ],
          detailDesc: [
            {required: true, message: "请选择一个数据库", trigger: "blur"}
          ],
          affectedRowNums: [
            {required: true, message: "请输入影响行数", trigger: "blur"}
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
        this.dbs = await this.$http.db.mysqlDb.get({
          env: "DML"
        });
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
      async handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$Message.success("Success!");
            debugger;
            // 验证成功，提交请求
            this.$http.auth.dml.createownerShip({
              db_id: this.formValidate.selectedDbId,
              description: this.formValidate.detailDesc,
              rowAffected: this.formValidate.affectedRowNums,
              sql: this.formValidate.dmlStatement,
              ticket_type: 3
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

  .form-wrapper {
    width: 70%;
    margin: auto;
  }
</style>
