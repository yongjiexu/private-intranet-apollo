<template>
  <div style="height:100%;background: #e0e0e0;" class="dbViewer" ref="menucontainer">
    <Input v-model="dbName" placeholder="筛选数据库" size="small" @on-change="filterDb"></Input>
    <div class="filter-container">
      <pdMenu style="height:100%;width:100%" ref="menu" :loading="loading" :open-names="openMenu" @on-select="selectTable" mode="vertical" accordion @on-open-change="changeDB" :active-name="activeName" v-if="type=='showDB'">
        <pdSubmenu :name="theDb" v-for="theDb in filterDbs" :key='theDb'>
          <template slot="title">
            <Icon type="ios-box"></Icon>
            <span>{{theDb}}</span>
          </template>
          <pdMenuItem name='a_input'>
            <Input v-model="chosedTable" placeholder="筛选表(只展示前100条，请搜索)" size="small" v-if="!!tables&&tables?tables.length>0:''" @on-change="filterTable" />
          </pdMenuItem>
          <pdMenuItem :name="`${key}`" v-for="(table,key) in filterTables" :key="key">
            <!-- <Icon type="ios-folder-outline"></Icon> -->
            <span>{{`${databaseType=='pg'?table.schema+' - ':''}${table.name}`}}</span>
            <span class="table-menu-item-operate">
                            <!-- <span @click="onCopy(`${databaseType=='pg'?table.schema+' - ':''}${table.name}`,$event)"><Icon type="ios-copy"></Icon></span> -->
                            <span @click="poptipStopDefault">
                                <Poptip trigger="hover" placement="right" :transfer="true">
                                    <span>
                                        <Icon type="ios-gear"></Icon>
                                    </span>
                                    <div slot="content" class="menu-pop">
                                        <ul>
                                            <li @click="getMoreInfo('column',key,$event)">表结构</li>
                                            <li @click="getMoreInfo('index',key,$event)">索引信息</li>
                                            <li @click="getMoreInfo('create',key,$event)">建表语句</li>
                                        </ul>
                                    </div>
                                </Poptip>
                            </span>
                        </span>
          </pdMenuItem>
        </pdSubmenu>
        <pdSubmenu name="addmore" :additional="true" v-if="dbName?(dbs.length>filterDbs.length&&filterDbs.length<showDbs.length):(dbs.length>filterDbs.length)">
          <template slot="title">
            <span style="display:block" @click="addMore">点击加载更多...</span>
          </template>
        </pdSubmenu>
      </pdMenu>
    </div>
  </div>
</template>

<script>
  import { Message } from "iview";
  import pdMenu from "../../base/menu/index";
  import pdSubmenu from "../../base/menu/submenu.vue";
  import pdMenuItem from "../../base/menu/menu-item.vue";

  export default {
    props: [
      "db",
      "dbs",
      "changeDB",
      "loadingStatus",
      "selectedTable",
      "selectTable",
      "tables",
      "openMenu",
      "getInfo",
      // "showMenu",
      "selectedDB",
      "updateShowMenu",
      "activeName",
      "updateActiveName",
      "type",
      "addDashboard",
      "databaseType",
      "loading",
      "getFilterTables"
    ],
    components: { pdMenu, pdSubmenu, pdMenuItem },
    data() {
      return {
        dbName: "",
        chosedTable: "",
        activeKey: this.tables ? this.tables[0] : "",
        filterDbs: [],
        showDbs: [],
        filterTables: [],
        showMenu: false
      };
    },

    methods: {
      stopDefault(e) {
        e.stopPropagation();
        e.preventDefault();
        this.showMenu = true;
      },
      poptipStopDefault(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      getMoreInfo(type, key, e) {
        e.stopPropagation();
        e.preventDefault();
        this.getInfo(type, key);
      },
      choseTable() {
        this.activeKey = this.chosedTable;
        this.selectTable(this.chosedTable);
      },
      filterTable(e) {
        this.filterTables = [];
        this.tables.map(item => {
          let str = "";
          if (this.databaseType == "pg") {
            str = item.schema + " - " + item.name;
          } else {
            str = item.name;
          }
          if (str.match(new RegExp(this.chosedTable, "i"))) {
            if (this.filterTables.length < 100) {
              this.filterTables.push(item);
            }
          }
        });
        this.getFilterTables(this.filterTables);
      },
      addMore(e) {
        //   e.stopPropagation();
        //   e.preventDefault();
        const pos = this.filterDbs.length;
        if (this.dbs.length - pos > 10) {
          this.dbs.slice(pos, pos + 10).forEach(item => {
            this.filterDbs.push(item);
          });
        } else {
          this.dbs.slice(pos, this.dbs.length).forEach(item => {
            this.filterDbs.push(item);
          });
        }
      },
      filterDb(e) {
        this.filterDbs = [];
        this.showDbs = [];
        this.dbs.map(item => {
          const str = item;
          if (str.match(new RegExp(this.dbName, "i"))) {
            this.showDbs.push(item);
          }
        });
        if (this.showDbs.length > 10) {
          this.filterDbs = this.showDbs.slice(0, 10);
        } else {
          this.filterDbs = this.showDbs;
        }
      },
      onCopy(name, e) {
        e.preventDefault();
        e.stopPropagation();
        this.$copyText(name).then(
          function(e) {
            Message.info({
              content: "复制成功",
              duration: 2
            });
          },
          function(e) {
            Message.info({
              content: "复制失败",
              duration: 2
            });
          }
        );
      }
    },

    watch: {
      tables(newData, old) {
        if (newData.length < 100) {
          this.filterTables = newData;
        } else {
          this.filterTables = newData.slice(0, 100);
        }
      },
      dbs(val, oldVal) {
        if (val.length < 10) {
          this.filterDbs = val;
        } else {
          this.filterDbs = val.slice(0, 10);
        }
      },
      selectedDB(val) {
        if (val == "addmore") {
          this.addMore();
        }
      },
      activeName(val) {
        this.$nextTick(function() {
          this.$refs.menu.updateActiveName();
        });
      }
    }
  };
</script>
<style>
  .dbViewer {
    position: relative;
  }

  .dbViewer .ivu-select .ivu-select-selection {
    border-radius: 0;
    border-left: none;
    border-top: none;
  }

  .dbViewer .ivu-select-dropdown {
    z-index: 999;
  }

  .dbViewer .ivu-menu-vertical .ivu-menu-item {
    padding: 8px 40px 8px 20px;
  }

  .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 8px 20px;
  }

  .dbViewer .ivu-menu {
    overflow: auto;
    font-size: 13px;
    z-index: 1;
  }

  .dbViewer .ivu-menu-item {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 15px;
  }

  .dbViewer .ivu-menu-item > span:not(.table-menu-item-operate) {
    padding-right: 20px;
    margin-right: 5px;
  }

  .dbViewer .ivu-tooltip-rel {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .filter-container {
    background: #fff;
    height: 100%;
  }

  .filter-container > .ivu-menu {
    padding-bottom: 30px;
  }

  .dbViewer input {
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
  }

  .filter-container input {
    border-right: none;
  }

  .menu-pop li {
    line-height: 20px;
    cursor: pointer;
  }

  .ivu-menu-opened .ivu-menu {
    /* padding-right: 10px; */
  }

  .table-menu-item-operate {
    position: absolute;
    right: 10px;
  }

  .table-menu-item-operate span {
    cursor: pointer;
  }

  .table-menu-item-operate span:hover {
    color: #00bc4a;
  }

  .table-menu-item-operate span:first-child {
    margin: 5px;
  }

  .menu-pop li:hover {
    color: #00bc4a;
  }
</style>
