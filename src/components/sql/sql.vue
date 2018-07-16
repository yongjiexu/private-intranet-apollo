<template>
  <div>
    <div class="operator">
      <ButtonGroup>
        <Button type="ghost" :disabled="isDisabled">运行(Ctrl+Enter)</Button>
        <Button type="ghost">清空</Button>
        <Button type="ghost">放大</Button>
        <Button type="ghost">缩小</Button>
        <Button type="ghost" :disabled="isDisabled">慢查询记录</Button>
        <Button type="ghost" :disabled="isDisabled">sql历史</Button>
        <Input class="sql-input" v-model="inputSql" placeholder="搜索sql"/>
        <Button type="ghost">搜索</Button>
      </ButtonGroup>
    </div>
    <div class="codemirror-wrapper">
      <codemirror v-model="code"
                  :options="cmOptions"
                  ref="myEditor"></codemirror>
    </div>
  </div>
</template>

<script>
  import {codemirror} from "vue-codemirror";
  import "codemirror/lib/codemirror.css";
  import "codemirror/mode/sql/sql";

  require("codemirror/addon/hint/show-hint.css");
  require("codemirror/addon/selection/active-line.js");
  require("codemirror/addon/hint/show-hint.js");
  require("codemirror/addon/hint/sql-hint.js");
  require("codemirror/addon/hint/anyword-hint.js");

  export default {
    // name: "sql",
    components: {
      codemirror
    },
    data() {
      return {
        inputSql: "",
        code: "SELECT * FROM T_A_2 LIMIT 200;",
        cmOptions: {
          styleActiveLine: true,
          tabSize: 2,
          mode: "text/x-mysql",
          theme: "default",
          lineNumbers: true,
          line: true,
        },
        isDisabled: true,
        prevSubMenuName: "",
        currentSubMenuName: ""
      };
    },
    created: function () {
      this.$eventBus.$on('select-db', this.toggleDisabled);
    },
    mounted() {
      console.log(codemirror);
    },
    // 最好在组件销毁前
    // 清除事件监听
    beforeDestroy() {
      this.$eventBus.$off('add-todo', this.toggleDisabled);
    },
    methods: {
      /**
       * select-db事件的回调
       * @param subMenuNameList 当前展开的 Submenu 的 name 值数组
       */
      toggleDisabled(subMenuNameList) {
        this.currentSubMenuName = subMenuNameList[0];
        // 处理无展开菜单的情况
        if (this.prevSubMenuName === "") {
          this.isDisabled = !this.isDisabled;
          this.prevSubMenuName = this.currentSubMenuName;
          return;
        } else { // 处理有展开菜单的情况
          // 处理单击收起已展开db的情况
          if (this.currentSubMenuName === undefined) {
            this.isDisabled = true;
            // 恢复无展开菜单的状态
            this.prevSubMenuName = "";
            this.currentSubMenuName = "";
            return;
          } else {
            // 处理单击其他未展开菜单的情况
            this.isDisabled = false;
            this.prevSubMenuName = this.currentSubMenuName;
            return;
          }
        }
      }
    }
  };
</script>

<style scoped>
  .sql-input {
    float: left;
    margin-left: 1px;
    width: 200px;
  }

  .operator {
    overflow: auto;
    background-color: #f5f7f9;
  }

  .ivu-btn-group {
    float: left;
  }

  .ivu-btn {
    height: 25px;
  }

  >>> input.ivu-input {
    height: 25px;
  }
  .operator >>> .ivu-btn span{
    position: relative;
    top: -2px;
  }
</style>
