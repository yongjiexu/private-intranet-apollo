<template>
  <div class="content-wrapper">
    <h2 class="title">owner分配</h2>
    <div class="form-wrapper">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="数据库:" prop="selectedDb">
          <Select v-model="formValidate.selectedDb" @on-change="handleSelectDb">
            <Option v-for="(db,index) in dbs" :key="index" :value="db">{{db}}</Option>
          </Select>
        </FormItem>
        <FormItem label="数据库编号:" prop="selectedDbId">
          <Input disabled v-model="formValidate.selectedDbId"/>
        </FormItem>
        <FormItem label="Owner（可多选）:" prop="selectedDbOwnerIds">
          <Select multiple v-model="formValidate.selectedDbOwnerIds">
            <Option
              v-for="(dbUser,index) in dbUsers"
              :key="index"
              :value="dbUser.id.toString()">
              {{dbUser.username}} {{dbUser.last_name}}
            </Option>
          </Select>
        </FormItem>
        <FormItem class="submit">
          <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dbs: [],
        dbUsers: [],
        dbOwnerIds: [],
        formValidate: {
          selectedDb: '',
          selectedDbId: '',
          selectedDbOwnerIds: [],
        },
        ruleValidate: {
          selectedDb: [
            {required: true, message: '请选择一个数据库', trigger: 'blur'},
          ],
          selectedDbId: [
            {required: true, message: '请选择一个数据库id', trigger: 'blur'},
          ],
          // note 默认验证类型是String，如果数据类型不是string，就要显式指出验证类型
          // 选准关键词，google就能找到答案
          selectedDbOwnerIds: [
            {
              type: 'array',
              required: true,
              message: '请选择数据库owner',
              trigger: 'change',
            },
          ],
        },
      };
    },
    computed: {
      dbOwnersInfo: function() {
        return this.dbUsers.filter(dbUser => {
          for (let i = 0; i < this.dbOwnerIds.length; i++) {
            if (dbUser.id.toString() === this.dbOwnerIds[i]) {
              return true;
            }
          }
          return false;
        });
      },
    },
    mounted() {
      this.init();
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$Message.success('Success!');
            // 验证成功，提交请求
            this.$http.auth.ownerShip.createownerShip({
              alias: this.formValidate.selectedDb,
              db_id: this.formValidate.selectedDbId,
              userids: this.formValidate.selectedDbOwnerIds,
            });
          } else {
            this.$Message.error('Fail!');
          }
        });
      },
      async init() {
        this.dbs = await this.$http.db.mysqlDb.get({
          env: 'ROLE',
        });
      },
      async handleSelectDb(value) {
        console.log(value);
        //  选择数据库后，发请求拿到数据库编号、owner
        this.formValidate.selectedDbId = (await this.$http.db.mysqlDbId.getDbId({
          alias: value,
        })).toString();
        this.dbOwnerIds = await this.$http.auth.owner.get({
          alias: value,
        });
        this.dbUsers = await this.$http.auth.user.get();
        console.log(this.dbOwnersInfo);
      },
    },
  };
</script>`
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
