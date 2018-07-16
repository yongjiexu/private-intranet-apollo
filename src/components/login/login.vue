<template>
  <div class="login-wrapper">
    <card class="card">
      <p slot="title">Apollo</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username" class="input-area">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" class="form-item">
          <Input type="password"
                 v-model="formInline.password"
                 placeholder="Password"
                 class="input-area"
                 @keyup.native.enter="test">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <br/>
        <FormItem class="form-item">
          <Button type="primary" @click="test">登录</Button>
        </FormItem>
      </Form>
    </card>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    name: 'login',
    data() {
      return {
        formInline: {
          user: '',
          password: '',
        },
        ruleInline: {
          user: [
            {required: true, message: '请填写用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
          ],
        },
      };
    },
    computed: mapState([
      'tabIndex',
      'tabContents',
      'currentActiveTabName',
    ]),
    methods: {
      ...mapMutations({
        setTabContents: 'SET_TABCONTENTS',
        setCurrentActiveName: 'SET_CURRENT_ACTIVE_TAB_NAME',
        setTabIndex: 'SET_TAB_INDEX',
        setUserName: 'SET_USERNAME',
      }),
      test() {
        this.$refs['formInline'].validate(async (valid) => {
          if (valid) {
            // 拿到的用户名、密码，应该持久化到本地。考虑vuex-persistence 或 localStorage
            await this.$http.log.login.post({
              username: this.formInline.user,
              password: this.formInline.password,
            });

            this.setUserName(this.formInline.user);
            this.setTabIndex('mysqlQueryIndex');
            this.$router.push({
              path: '/index/query/mysql-query',
              query: {
                index: this.tabIndex.mysqlQueryIndex,
              },
            });
          } else {
            this.$Message.error('Fail!');
          }
        });
      },
    },
    created() {
      localStorage.clear();
    },
  };
</script>

<style scoped>
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15%;
  }

  >>> .ivu-card-head {
    text-align: center;
  }

  >>> .ivu-form-item-content {
    text-align: center;
  }

  .card {
    width: 350px;
  }

  .input-area {
    width: 300px;
    margin: auto;
  }
</style>
