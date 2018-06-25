<template>
  <div class="query-wrapper">
    <db class="db"
        :db='db'
        :dbs='dbs'
        loadingStatus='loadingStatus'
        :selectedTable='selectedTable'
        loadTable='loadTable'
        :selectTable='selectTable'
        :changeDB='changeDB'
        :tables='tables'
        :openMenu="openMenu"
        :getInfo="getInfo"
        :showMenu="showMenu"
        :selectedDB='selectedDB'
        :updateShowMenu='updateShowMenu'
        :activeName='activeName'
        :updateActiveName='updateActiveName'
        type='showDB'
        :databaseType="databaseType"
        :loading="loading"
        :getFilterTables="getFilterTables"></db>
    <div class="right">
      <sql class="sql"></sql>
      <result class="result"></result>
    </div>
  </div>
</template>

<script>
  import db from "../db/db";
  import sql from "../sql/sql";
  import result from "../result/result";

  import {
    loadDB,
    querySql,
    getTable,
    getColumns,
    getIndex,
    createTable,
    queryResult,
    explain,
    getInsert,
    insertSQ,
    getSlowQueryRecords
  } from "../../api/query/dashboard.js";

  export default {
    name: "query",
    components: {
      db,
      sql,
      result
    },

    data() {
      return {
        loadingStatus: {query: false, explain: false},
        actions: {},
        dbs: [],
        profile: {},
        selectedDB: "",
        db: {},
        selectedTable: "",
        code: "",
        table: {},
        historialSqls: [],
        messages: [],
        selectedResultTab: "",
        query: {execution: "", explain: ""},
        tables: [],
        index: [],
        openMenu: [],
        resultContainer: "result",
        createSql: "",
        showMenu: false,
        tableColumn: [],
        activeName: "",
        env: "stable",
        databaseType: "mysql",
        editor: "",
        loading: false,
        filterTables: [],
        resize: 0,
        executeSql: "",
        showSlowQuery: false,
        slowQueryColumn: [
          {
            title: "数据库",
            key: "database",
            width: 150
          },
          {
            title: "操作者",
            key: "username",
            width: 120
          },
          {
            title: "操作时间",
            key: "gmt51_create",
            width: 150,
            render: (h, param) => {
              return h(
                "div",
                {},
                fecha.format(
                  new Date(param.row.gmt51_create.substr(0, 19)),
                  "YYYY-MM-DD HH:mm:ss"
                )
              );
            }
          },
          {
            title: "sql",
            key: "sql"
          }
        ],
        slowQueryData: [],
        columnNameList: [],
        currentExecSqlStatement: ""
      };
    },
    created() {
      this.getDb();
    },
    methods: {
      async getDb() {
        this.dbs = await this.$http.db.mysqlDb.get({
          env: "stable"
        });
      },
      selectTable(key, e) {
        if (key != "a_input") {
          this.loadingStatus.table = true;
          this.selectedTable = this.filterTables[key];
          let sql = this.code || "",
            addedSql = "";
          if (this.databaseType == "mysql" || this.databaseType == "tidb") {
            addedSql = `SELECT * FROM ${this.selectedTable.name} LIMIT 200;`;
          } else {
            addedSql = `SELECT * FROM ${this.selectedTable.schema}.${this
              .selectedTable.name} LIMIT 200;`;
          }
          sql = sql.trim();
          if (sql !== "") {
            sql += "\n";
          }
          sql += addedSql;
          this.updateCode(sql);
          this.querySql(this.db.id, addedSql, this.code.split("\n").length - 1);

          this.getColumnNameList(key);
        }
        this.resultContainer = "result";
      },
      changeDB(dbId, e) {
        this.selectedDB = dbId[0];
        this.tables = [];
        this.query = {execution: "", explain: ""};
        this.loading = true;
        if (this.selectedDB && dbId != "addmore") {
          getTable(this.databaseType, {
            alias: dbId[0],
            env: this.env
          })
            .then(res => {
              this.tables = res.data;
              this.loading = false;
              this.filterTables = this.tables;
            })
            .catch(e => {
              this.loading = false;
            });
        }
      },
      getInfo(type, key) {
        this.activeName = key;
        if (type == "column") {
          this.resultContainer = "column";
          this.loadingStatus.table = true;
          getColumns(this.databaseType, {
            alias: this.selectedDB,
            env: this.env,
            tableName: this.filterTables[key].name,
            schema: this.filterTables[key].schema
          })
            .then(res => {
              this.tableColumn = res.data;
              this.messages.push({
                type: "LOAD_TABLE_SUCCESS",
                value: this.filterTables[key].name,
                time: this.getTimeNow()
              });
              this.loadingStatus.table = false;
            })
            .catch(e => {
              if (e.response && e.response.data) {
                this.messages.push({
                  type: "LOAD_TABLE_FAILURE",
                  value: "",
                  message: e.response.data.message,
                  time: this.getTimeNow()
                });
              } else {
                this.messages.push({
                  type: "LOAD_TABLE_FAILURE",
                  value: "",
                  message: "失败",
                  time: this.getTimeNow()
                });
              }
              this.loadingStatus.table = false;
            });
        } else if (type == "index") {
          this.resultContainer = "index";
          getIndex(this.databaseType, {
            alias: this.selectedDB,
            env: this.env,
            tableName: this.filterTables[key].name,
            schema: this.filterTables[key].schema
          })
            .then(res => {
              this.index = res.data;
              this.loadingStatus.table = false;
            })
            .catch(e => {
              this.loadingStatus.table = false;
            });
        } else if (type == "create") {
          this.resultContainer = "create";
          createTable(this.databaseType, {
            alias: this.selectedDB,
            env: this.env,
            tableName: this.filterTables[key].name,
            schema: this.filterTables[key].schema
          }).then(res => {
            this.createSql = res.data;
          });
        }
        this.showMenu = false;
      },
      updateShowMenu() {
        this.showMenu = true;
      },
      updateActiveName(name) {
        this.activeName = name.toString();
      },
      getFilterTables(tables) {
        this.filterTables = tables;
      }
    }
  };
</script>

<style scoped>
  .query-wrapper {
    display: flex;
    height: 100%;
  }

  .db {
    flex: 0 0 200px;
    width: 240px;
    margin-right: 1px;
    /*height: ;*/
  }

  .right {
    flex: 1 1;
  }
</style>
