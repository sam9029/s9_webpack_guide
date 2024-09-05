import axios from "axios";

import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
// 由于该文件是JS文件，属于手动导入，需要手动对应样式 (按需引入只处理Vue文件)

// 创建axios实例
const request = axios.create({
  // 读取环境文件的网络请求路径变量-设置根路径
  baseURL: process.env.VUE_APP_BASE_URL,
  // 设置超时时间
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  // 请求头
  (config) => {
    // token配置
    config.headers["Authorization"] = "Bearer " + "test_use_token";
    return config;
  },
  // 请求失败
  (error) => {
    return Promise.reject(new Error(error));
  }
);

// 响应拦截器
request.interceptors.response.use(
  // 响应成功
  (response) => {
    const res = response.data;

    if (res.code !== 0) {
      ElMessage.error(res.message || res || "请求成功，接口响应错误！");
    } else {
      return res;
    }
  },

  // 响应失败
  (error) => {
    //网络超时异常处理
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      ElMessage.error("请求超时，请稍后重试");
    }
    // 网路无连接处理
    else if (error.message === "Network Error") {
      ElMessage.error("无网络，请检查网络链接");
    }
    // 状态码系列
    else {
      let status_code = error.response.status;
      let err_message = error.response.data.message;

      if (status_code.toString().split("")[0] == 4) {
        switch (status_code) {
          case 401:
            ElMessage.error(
              `[ 身份权限错误 [ 状态码：${status_code}] ] ` + err_message
            );
            break;
          case 403:
            ElMessage.error(
              `[ 路由权限错误 [ 状态码：${status_code}] ] ` + err_message
            );
            break;
          case 404:
            ElMessage.error(
              `[ 访问路由不存在 [ 状态码：${status_code}] ] ` + err_message
            );
            break;
        }
      } else if (status_code.toString().split("")[0] == 5) {
        ElMessage.error(
          `[ 服务端错误 [ 状态码：${status_code}] ] ` + (error.message || error)
        );
      } else {
        ElMessage.error(error.message || error || "网络请求报错，未知错误！");
      }
    }
  }
);

/** 自动处理 get-params/post-data 传参字段不一致 */
export default ({ method, url, data }) => {
  return request({
    method,
    url,
    // 若 method为post 则用 data,否则用param
    [method.toLowerCase() === "get" ? "params" : "data"]: data,
  });
};
