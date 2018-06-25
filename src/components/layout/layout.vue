<template>
  <div class="layout-wrapper">
    <m-header></m-header>
    <m-content></m-content>
  </div>
</template>

<script>
  import MHeader from "../m-header/m-header";
  import MContent from "../m-content/m-content";

  export default {
    name: "layout",
    components: {
      MHeader,
      MContent
    }
  };
</script>

<style scoped>
  .layout-wrapper {
    height: 100%;
  }
</style>
