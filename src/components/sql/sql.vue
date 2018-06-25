<template>
  <div>
    <div class="operator">
      <ButtonGroup>
        <Button type="ghost">运行(Ctrl+Enter)</Button>
        <Button type="ghost">清空</Button>
        <Button type="ghost">放大</Button>
        <Button type="ghost">缩小</Button>
        <Button type="ghost">慢查询记录</Button>
        <Button type="ghost">sql历史</Button>
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
        }
      };
    },
    mounted() {
      console.log(codemirror);
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
</style>
