import {instance} from './instance'
// import qs from 'qs';

/**
 * 登出
 */
export const loadDB = (databaseType, param) => {
  return instance.get(`db/${databaseType}/db`, {params: param})
}

export const loadDetailDB = (databaseType, param) => {
  return instance.get(`db/${databaseType}/detailDbs`, {params: param})
}

export const loadInstance = (param) => {
  return instance.get(`getInstances`, {params: param})
}

export const getDb = (databaseType, param) => {
  return instance.get(`db/${databaseType}/getDb`, {params: param})
}

export const getTable = (databaseType, param) => {
  return instance.get(`db/${databaseType}/table`, {params: param})
}

export const querySql = (databaseType, param) => {
  return instance.post(`db/${databaseType}/query`, param)
}

export const queryResult = (databaseType, param) => {
  return instance.post(`db/${databaseType}/query`, param)
}

export const getInsert = (databaseType, param) => {
  return instance.post(`db/${databaseType}/insert`, param)
}

export const explain = (databaseType, param) => {
  return instance.post(`db/${databaseType}/explain`, param)
}

export const getColumns = (databaseType, param) => {
  return instance.get(`db/${databaseType}/column`, {params: param})
}

export const getIndex = (databaseType, param) => {
  return instance.get(`db/${databaseType}/index`, {params: param})
}
// export const explainSql = (id,param) => {
//     return instance.post(`api/dbs/${id}/queries/`,param);
// };

export const loadHistorialSqlList = (databaseType) => {
  return instance.get(`db/${databaseType}/historialQuery/`)
}

export const createTable = (databaseType, param) => {
  return instance.get(`db/${databaseType}/showCreateTable/`, {params: param})
}

export const getDbId = (databaseType, param) => {
  return instance.get(`db/${databaseType}/getDbId/`, {params: param})
}

export const insertSQ = (param) => {
  return instance.post(`slowQueryRecord/insert`, param)
}

export const getSlowQueryRecords = (param) => {
  return instance.get(`slowQueryRecord/list`, {params: param})
}
