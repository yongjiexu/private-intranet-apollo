<template>
  <div class="content-wrapper">
    <h2 class="title">提交数据库工单</h2>
    <div class="form-wrapper">
      <Form :label-width="80"
            ref="formValidate"
            :rules="ruleValidate"
            :model="formValidate">
        <FormItem label="工单类型"
                  prop="ticketType">
          <Select placeholder="选择工单类型"
                  v-model="formValidate.ticketType">
            <Option value="check">数据库查看权限申请</Option>
            <Option value="owner">数据库所有者认领</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库"
                  prop="selectedDb">
          <Select v-model="formValidate.selectedDb"
                  @on-change="handleSelectDb">
            <Option v-for="(db,index) in dbs"
                    :key="index"
                    :value="db">{{db}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="数据库编号"
                  prop="dbId">
          <Input type="text" disabled v-model="formValidate.dbId"/>
        </FormItem>
        <FormItem label="owner"
                  prop="dbOwner">
          <Input type="text"
                 disabled
                 v-model="selectedDbOwnerForDisplay"/>
        </FormItem>
        <FormItem label="详情描述"
                  prop="detailDesc">
          <Input type="textarea"
                 v-model="formValidate.detailDesc"/>
        </FormItem>
        <FormItem class="submit">
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
    name: 'db-auth-apply',
    data() {
      return {
        dbs: [],
        selectedDbOwner: [],
        selectedDbOwnerForDisplay: '',
        selectedDbUser: [],

        formValidate: {
          ticketType: '',
          selectedDb: '',
          dbId: '',
          dbOwner: '',
          detailDesc: '',
        },

        ruleValidate: {
          ticketType: [
            {
              required: true,
              message: '请选择工单类型',
              trigger: 'blur',
            },
          ],
          selectedDb: [
            {
              required: true,
              message: '请选择数据库',
              trigger: 'blur',
            },
          ],
          dbId: [
            {
              required: true,
              trigger: 'blur',
            },
          ],
          dbOwner: '',
          detailDesc: [
            {
              required: true,
              message: '请填写详情描述',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        this.dbs = await this.$http.db.mysqlDb.get({env: 'TEMP'});
      },
      async handleSelectDb(value) {
        this.formValidate.selectedDb = value;
        this.formValidate.dbId = (await this.$http.db.mysqlDbId.getDbId({
          alias: value,
        })).toString();
        this.selectedDbOwner = await this.$http.auth.owner.get({
          alias: value,
        });
        this.selectedDbUser = await this.$http.auth.user.get();

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
        let result = '';
        for (let i = 0; i < dbOwnerInfo.length; i++) {
          result += `${dbOwnerInfo[i].username} ${dbOwnerInfo[i].last_name},`;
        }
        result = result.substring(0, result.length - 1);
        this.selectedDbOwnerForDisplay = result;
      },
      handleSubmit() {
        this.$refs['formValidate'].validate(valid => {
          if (valid) {
            console.log('表单验证成功');
            //  表单验证成功后提交表单
            this.$http.auth.dbAuth.createDbAuth({
              db_id: this.formValidate.dbId,
              description: this.formValidate.detailDesc,
              ticket_type: 1,
            });
            //  todo 提交成功后跳转到工单详情页
          } else {
            console.log('表单验证失败');
          }
        });
      },
    },
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

  .submit {
    text-align: center;
  }
</style>
