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
        <router-view :name="tabContent.routerViewName"></router-view>
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
        debugger
        console.log(`${from.fullPath} --> ${to.fullPath}`);
        let toPathSegment = to.fullPath.split('/');
        this.setCurrentActiveName(toPathSegment[toPathSegment.length - 1]);
      }
    },
    methods: {
      ...mapMutations({
        setCurrentActiveName: 'SET_CURRENT_ACTIVE_TAB_NAME'
      }),
      handleOnClick(name) {
        debugger;
        console.log(name);
        console.log(this.currentActiveTabName);
      },
      handleTabRemove(name) {
        this['tab' + name] = false;
      }
    }
  };
</script>

<style scoped>

</style>
