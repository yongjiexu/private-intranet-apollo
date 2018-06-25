<template>
  <div class="content-wrapper">
    <h2 class="title">角色分配</h2>
    <div class="form-wrapper">
      <Form :label-width="80"
            :rules="ruleValidate"
            ref="formValidate"
            :model="formValidate">
        <FormItem label="数据库"
                  prop="selectedDb">
          <Select v-model="formValidate.selectedDb"
                  @on-change="handleSelectDb">
            <Option v-for="(db,index) in dbs"
                    :key="index"
                    :value="db"></Option>
          </Select>
        </FormItem>
        <FormItem label="数据库编号"
                  prop="dbId">
          <Input type="text"
                 disabled
                 :value="formValidate.dbId"/>
        </FormItem>
        <FormItem label="owner"
                  pro="dbOwner">
          <Input type="text"
                 disabled
                 :value="selectedDbOwnerForDisplay"/>
        </FormItem>
        <FormItem label="选取角色">
          <Select v-model="selectedRole">
            <Option value="developer">开发人员</Option>
            <Option value="tester">测试人员</Option>
            <Option value="watcher">查看人员</Option>
          </Select>
        </FormItem>
        <FormItem label="人员分配"
                  prop="peopleAssignment">
          <Select multiple
                  v-model="formValidate.userIds"
                  @on-change="handlePeopleAssignmentChange">
            <Option v-for="(dbUser,index) in selectedDbUser"
                    :key="index"
                    :value="dbUser.id.toString()">
              {{dbUser["last_name"]}} {{dbUser["username"]}}
            </Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit">
            提交
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "role",
    data() {
      return {
        dbs: [],
        selectedDbUser: [],
        selectedDbOwner: [],
        selectedRole: "developer",
        selectedDbOwnerForDisplay: "",
        formValidate: {
          userIds: [],
          peopleAssignment: [],
          selectedDb: "",
          dbId: "",
          dbOwner: ""
        },

        ruleValidate: {
          userIds: [
            {
              required: true,
              message: "请指定人员分配",
              trigger: "blur"
            }
          ],
          selectedDb: [
            {
              required: true,
              message: "请选择数据库",
              trigger: "blur"
            }
          ],
          dbId: [
            {
              required: true,
              trigger: "blur"
            }
          ],
          selectedDbOwnerForDisplay: [
            {
              required: true,
              trigger: "blur"
            }
          ],
          detailDesc: [
            {
              required: true,
              message: "请填写详情描述",
              trigger: "blur"
            }
          ]
        }
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      /**
       * 处理人员分配select组件的事件
       * @param value 返回的value是当前选中项的id构成的数组
       */
      handlePeopleAssignmentChange(value) {
        console.log(value);
        this.userIds = value;
      },
      async init() {
        this.dbs = await this.$http.db.mysqlDb.get({env: "ROLE"});
      },
      async handleSelectDb(value) {
        this.formValidate.selectedDb = value;
        console.log(value);
        this.formValidate.dbId = (await this.$http.db.mysqlDbId.getDbId({
          alias: value
        })).toString();

        this.selectedDbOwner = await this.$http.auth.owner.get({
          alias: value
        });
        this.selectedDbUser = await this.$http.auth.user.get();

        // 用selectedDbOwner中的id 筛选 selectedDbUser中的元素
        let _selectedDbOwner = this.selectedDbOwner;
        let _selectedDbUser = this.selectedDbUser;
        let dbOwnerInfo = _selectedDbUser.filter(dbUser => {
          for (let i = 0; i < _selectedDbOwner.length; i++) {
            if (dbUser.id.toString() === _selectedDbOwner[i]) {
              return true;
            }
          }
          return false;
        });
        let result = "";
        for (let i = 0; i < dbOwnerInfo.length; i++) {
          result += `${dbOwnerInfo[i].last_name},`;
        }
        result = result.substring(0, result.length - 1);
        this.selectedDbOwnerForDisplay = result;

        //  获取人员分配的ids
        let peopleAssignmentIds = await this.$http.auth.role.get({
          alias: this.formValidate.selectedDb,
          type: this.selectedRole,
          db_id: 12
        });
        //  根据ids筛选出数组，从筛选出的数组中组织数据
        let peopleAssignmentIdsArray = peopleAssignmentIds.ids === null ? [] : peopleAssignmentIds.ids.split(",");
        let peopleAssignmentArray = _selectedDbUser.filter(dbUser => {
          for (let i = 0; i < peopleAssignmentIdsArray.length; i++) {
            if (dbUser.id.toString() === peopleAssignmentIdsArray[i]) {
              return true;
            }
          }
          return false;
        });
        this.formValidate.peopleAssignment = peopleAssignmentArray.map(
          peopleAssignment => {
            return {
              value: peopleAssignment.id.toString(),
              label: `${peopleAssignment.username} ${peopleAssignment.last_name}`
            };
          }
        );
      },
      handleSubmit() {
        this.$refs["formValidate"].validate(valid => {
          if (valid) {
            console.log("表单验证成功");
            //  表单验证成功后提交表单
            this.$http.auth.roleUpdate.update({
              db_id: this.formValidate.dbId,
              role: this.selectedRole,
              userids: this.userIds
            });
            //  todo 提交成功后跳转到工单详情页
          } else {
            console.log("表单验证失败");
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
