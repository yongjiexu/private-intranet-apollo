<template>
  <div class="content-wrapper">
    <Tabs :value="currentActiveTabName" type="card" closable
          :animated="false"
          @on-tab-remove="removeTab"
          @on-click="clickTab">
      <TabPane
        v-for="(tabContent, index) in tabContents"
        :key="tabContent.name"
        :label="tabContent.label"
        :name="tabContent.name">
        <TabContent
          :route="tabContent.route"
          :index="index">
        </TabContent>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import TabContent from '../../base/tab-content/tab-content';
  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    name: 'm-content',
    data() {
      return {};
    },
    components: {
      TabContent,
    },
    computed: mapState([
      'tabIndex',
      'tabContents',
      'currentActiveTabName',
    ]),
    watch: {
      /**
       * 监测路由变化
       * 当路由变化时，改变当前active tab
       * @param to
       * @param from
       */
      '$route'(to, from) {
        console.log(`${from.fullPath} --> ${to.fullPath}`);
        let toFullPath = to.fullPath;
        let path = to.fullPath.split('?');

        let toPathSegment = to.fullPath.split('?')[0].split('/');
        /* 设置当前激活页
        todo 以后随着页面的增多，判断条件会跟着变复杂
         */
        this.setCurrentActiveName(to.fullPath);
        // if (to.fullPath !== '/index/db-auth-apply') {}
      },
    },
    mounted() {
      this.setCurrentActiveName('/index/query/mysql-query?index=0');
      // document.querySelector(".el-tabs__content").style.height = "100%";
    },
    methods: {
      ...mapMutations({
        setCurrentActiveName: 'SET_CURRENT_ACTIVE_TAB_NAME',
        deleteTabContentsElm: 'DELETE_TABCONTENTS_ELM',
      }),
      clickTab(tabInstance) {
        console.log(tabInstance);
        console.log(`点击了${tabInstance.name}`);
        this.setCurrentActiveName(tabInstance.name);
        this.$router.push({
          path: tabInstance.name,
        });
      },
      removeTab(targetName) {
        let tabs = this.tabContents;
        let activeName = this.currentActiveTabName;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.setCurrentActiveName(activeName);
        this.$router.push({
          path: activeName,
        });
        this.deleteTabContentsElm(targetName);
      },
      handleOnClick(name) {
        console.log(`点击了${name}`);
        this.setCurrentActiveName(name);
        console.log(`当前激活的标签页${this.currentActiveTabName}`);
        this.$router.push({
          path: name,
        });
      },
      handleTabRemove(name) {
        console.log(`name为：${name}的标签被关闭了`);
        console.log(`当前激活的标签页name是${this.currentActiveTabName}`);
        // todo 删除tabContents元素会导致tabs组件渲染异常。以后去tabs组件中查明原因。
        // 解决办法：给key加上时间戳。dont't know why
        // this.deleteTabContentsElm(name);
      },
    },
  };
</script>

<style scoped>
  .content-wrapper {
    height: 100%;
  }

  .el-tabs {
    height: 100%;
  }

  .el-tab-pane {
    height: 100%;
  }
</style>
