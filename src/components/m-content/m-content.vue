<template>
  <div class="content-wrapper">
    <Tabs type="card" closable
          :animated="false"
          :value="currentActiveTabName"
          @on-click="handleOnClick"
          @on-tab-remove="handleTabRemove">
      <TabPane v-for="(tabContent,index) in tabContents"
               :key="index"
               :name="tabContent.name"
               :label="tabContent.label">
        <keep-alive>
          <router-view :name="tabContent.routerViewName"></router-view>
        </keep-alive>
      </TabPane>
      <Button type="ghost" size="small" slot="extra">增加</Button>
    </Tabs>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    name: "m-content",
    data() {
      return {};
    },
    computed: mapState([
      'tabIndex',
      'tabContents',
      'currentActiveTabName'
    ]),
    watch: {
      /**
       * 监测路由变化
       * 当路由变化时，改变当前active tab
       * @param to
       * @param from
       */
      '$route'(to, from) {
        debugger;
        console.log(`${from.fullPath} --> ${to.fullPath}`);
        let toFullPath = to.fullPath;
        let path = to.fullPath.split('?');

        let toPathSegment = to.fullPath.split('?')[0].split('/');
        // 设置当前激活页
        this.setCurrentActiveName(to.fullPath);
      }
    },
    mounted() {
      debugger;
      this.setCurrentActiveName('/index/query/mysql-query?index=0');
    },
    methods: {
      ...mapMutations({
        setCurrentActiveName: 'SET_CURRENT_ACTIVE_TAB_NAME',
        deleteTabContentsElm: 'DELETE_TABCONTENTS_ELM'
      }),
      handleOnClick(name) {
        debugger;
        console.log(`点击了${name}`);
        this.setCurrentActiveName(name);
        console.log(`当前激活的标签页${this.currentActiveTabName}`);
        this.$router.push({
          path: name
        });
      },
      handleTabRemove(name) {
        console.log(`name为：${name}的标签被关闭了`);
        console.log(`当前激活的标签页name是${this.currentActiveTabName}`);
        // todo 删除tabContents元素会导致tabs组件渲染异常。以后去tabs组件中查明原因。
        // 解决办法：给key加上时间戳。dont't know why
        // this.deleteTabContentsElm(name);
      }
    }
  };
</script>

<style scoped>

</style>
