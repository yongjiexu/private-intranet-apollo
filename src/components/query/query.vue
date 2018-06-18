<template>
    <span>查询组件{{testNum}}</span>
</template>

<script>
  export default {
    name: "query",
    data() {
      return {
        testNum: -1
      };
    },
    created() {
      // 这说明组件没有被复用
      this.testNum++;
      console.log('我被创建了');
    }
  };
</script>

<style scoped>

</style>
