<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  };
  /*  todo text-align center 会影响codemirror组件。啊啊啊，老子真是服了
  样式太重要了，好好学。
   */
</script>

<style scoped>
  .app {
    height: 100%;
  }
</style>
