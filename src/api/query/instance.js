import axios from 'axios';
import {
  getCookie
} from './utils';
// import { Message } from 'element-ui';
import {
  Message,
  Modal,
  Spin
} from 'iview';

const baseURL = '/' + 'apollo-server/api/v1/';
const timeout = 20000;

export const instance = axios.create({
  baseURL,
  timeout: timeout,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-CSRFToken': getCookie('csrftoken')
  },
  withCredentials: true,
  credentials: 'include'
});

const errorMap = {
  400: '请求失败',
  401: '未授权',
  403: '禁止访问',
  404: '地址未找到',
  499: '未登陆'
};

// 返回结果拦截器,处理默认的错误
instance.interceptors.response.use(function (response) {
  // 正常的请求前拦截,在这里处理
  return response;
}, function (error) {
  // 非200请求时的错误处理'
  Spin.hide();
  if (error.response) {
    const res = error.response.data; // 请求data
    const status = error.response.status; // 请求状态吗
    const message = res.message || (res.errors && res.errors[0].message); // 错误消息

    if (status === 499) {
      window.location.href = res.url;
    } else if (status === 401) {
      router.push({
        path: '/myLogin'
      });
    } else if (res && !res.errors) {
      // Message.info({
      //     content: res.message,
      //     duration: 5,
      //     closable: true
      // });

      Modal.error({
        title: `ERROR`,
        content: `${res.message}`
      });
    } else {
      // Message.info({
      //     content: res.errors[0].code + ":" + res.errors[0].message,
      //     duration: 5,
      //     closable: true
      // });
      Modal.error({
        title: `ERROR`,
        content: `${res.errors[0].message}`
      });
    }
  } else {
    Modal.error({
      title: `ERROR`,
      content: `已超时！`
    });
  }
  // Do something with response error
  return Promise.reject(error);
});
