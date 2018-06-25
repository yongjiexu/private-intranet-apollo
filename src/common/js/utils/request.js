import axios from "axios";
import qs from "qs";
import { Notice } from "iview";

const httpMap = {};
const defaultConfig = {
  baseURL: "/apollo-server/api/v1",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  },
  // 参考https://www.npmjs.com/package/qs
  paramsSerializer: function(params) {
    return qs.stringify(params, { arrayFormat: "repeat" });
  }
};

httpMap.default = axios.create(defaultConfig);
httpMap.login = axios.create({
  ...defaultConfig,
  baseURL: ""
});

httpMap.default.interceptors.request.use(
  requestSuccessHandler,
  requestErrorHandler
);
httpMap.default.interceptors.response.use(
  responseSuccessHandler,
  responseErrorHandler
);

httpMap.login.interceptors.request.use(
  requestSuccessHandler,
  requestErrorHandler
);
httpMap.login.interceptors.response.use(
  responseSuccessHandler,
  responseErrorHandler
);

function requestSuccessHandler(config) {
  return config;
}

function requestErrorHandler(error) {
  return Promise.reject(error);
}

function responseSuccessHandler(response) {
  return response.data;
}

function responseErrorHandler(error) {
  /* eslint-disable no-unused-vars */
  const {
    response: { status, data }
  } = error;
  //
  console.log(status);
  const { errors = [] } = data;
  errors.forEach(error => {
    Notice.error({
      title: error.code,
      desc: error.message
    });
  });
  switch (true) {
    case status >= 500:
      // 服务端错误
      break;
    case status >= 400:
      // 客户端错误
      break;
    // default:
  }
  return Promise.reject(error);
}

export default function request(instName = "default") {
  const instance = httpMap[instName];
  return instance;
}
