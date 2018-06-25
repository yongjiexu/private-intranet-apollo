import { request } from "../common/js/utils/index";
/*
  每个接口一个字段
  添加代码时，考虑数据库种类和api路径,
  一个对象中只放针对一个路径的 restful 操作
 */
const db = {
  mysqlDb: {
    get(params) {
      return request()
        .get("db/mysql/db", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlTables: {
    getTables(params) {
      return request()
        .get("db/mysql/table", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlExplain: {
    getExplain(params) {
      return request()
        .post("db/mysql/explain", params)
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlColumn: {
    getColumn(params) {
      return request()
        .get("db/mysql/column", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlQuery: {
    getQuery(params) {
      return request()
        .post("db/mysql/query", params)
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlHistorialQuery: {
    getQuery(params) {
      return request()
        .get("db/mysql/historialQuery", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlDbId: {
    getDbId(params) {
      return request()
        .get("db/mysql/getDbId", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlIssueListOne: {
    getIssueListOne() {
      return request()
        .get("db/mysql/issue/list/1")
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlIssueListTwo: {
    getIssueListTwo() {
      return request()
        .get("db/mysql/issue/list/2")
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlIssueListThree: {
    getIssueListThree() {
      return request()
        .get("db/mysql/issue/list/3")
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlIssueListFour: {
    getIssueListFour() {
      return request()
        .get("db/mysql/issue/list/4")
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlIssueListFive: {
    getIssueListFive() {
      return request()
        .get("db/mysql/issue/list/5")
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  mysqlIssueListSix: {
    getIssueListSix() {
      return request()
        .get("db/mysql/issue/list/6")
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  pgDb: {
    get(params) {
      return request()
        .get("db/pg/db", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  pgTables: {
    getTables(params) {
      return request()
        .get("db/pg/table", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  tiDb: {
    get(params) {
      return request()
        .get("db/tidb/db", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  tidbTables: {
    getTables(params) {
      return request()
        .get("db/tidb/table", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  slowQuery: {
    get(params) {
      return request()
        .get("slowQueryRecord/list", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  // 收藏SQL
  collection: {
    // 获取我的收藏SQL
    get() {
      return request()
        .get("db/collection/list")
        .then(res => {
          console.log(res);
          return res;
        });
    },
    // 添加我的收藏SQL
    post(params) {
      return request()
        .post("db/collection/add", params)
        .then(res => {
          console.log(res);
          return res;
        });
    },
    // 删除我的收藏SQL
    delete(params) {
      return request()
        .delete(`db/collection/delete/${params}`)
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  slowTemplate: {
    list(params) {
      return request()
        .post("db/mysql/slowTemplate/list", params)
        .then(res => {
          console.log(res);
          return res;
        });
    },
    getConfig(params) {
      return request()
        .post("db/mysql/slowTemplate/getConfig", params)
        .then(res => {
          console.log(res);
          return res;
        });
    },
    changeConfig(params) {
      return request()
        .post("db/mysql/slowTemplate/changeConfig", params)
        .then(res => {
          console.log(res);
          return res;
        });
    },
    count(params) {
      return request()
        .post("db/mysql/slowTemplate/count", params)
        .then(res => {
          console.log(res);
          return res;
        });
    },
    alarm(param) {
      return request()
        .get(`db/mysql/slowTemplate/alarm/${param}`)
        .then(res => {
          console.log(res);
          return res;
        });
    },
    changeSuspend(params) {
      return request()
        .post("db/mysql/slowTemplate/changeSuspend", params)
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  login: {
    post(params) {
      return request("login")
        .post("/login", params)
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  tickets: {
    get(params) {
      return request()
        .get("tickets", { params })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  }
};

export default db;
