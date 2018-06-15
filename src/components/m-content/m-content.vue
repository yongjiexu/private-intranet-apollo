<template>
  <div class="content-wrapper">
    <Tabs type="card" closable
          :animated="false"
          @on-tab-remove="handleTabRemove">
      <TabPane label="标签一" v-if="tab0">
        <router-view></router-view>
      </TabPane>
      <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
      <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
      <Button type="ghost" size="small" slot="extra">增加</Button>
    </Tabs>
  </div>
</template>

<script>
  export default {
    name: "m-content",
    data() {
      return {
        tab0: true,
        tab1: true,
        tab2: true
      };
    },
    methods: {
      handleTabRemove (name) {
        this['tab' + name] = false;
      }
    }
  };
</script>

<style scoped>

</style>
