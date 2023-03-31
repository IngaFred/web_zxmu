import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
// 引入store
import store from '../store';
import { message } from 'antd';
// 引入定义好的clearToken
import { clearToken } from '../store/modules/user';

// 创建实例
const instance = axios.create({
  baseURL: 'https://zcmu.vxpage.top/',
  timeout: 5000,
});

// 拦截器
instance.interceptors.request.use(
  function (config) {
    // 进行请求头的检测
    if (config.headers) {
      // 给请求头设置token 头信息
      config.headers.authorization = store.getState().user.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应
instance.interceptors.response.use(
  function (response) {
    // token 出错在响应头里的处理 返回login
    if (response.data.errmsg === 'token error') {
      message.error('token error');
      store.dispatch(clearToken());
      // 刷新页面
      setTimeout(() => {
        window.location.replace('/login');
      }, 1000);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

interface Http {
  get: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  post: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    type?: 'upload'
  ) => Promise<AxiosResponse>;
  put: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  patch: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
  delete: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse>;
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config,
    });
  },
  post(url, data, config, type) {
    if (!data) {
      return instance.post(url, data, config);
    }

    // 上传文件
    if (type === 'upload') {
      const formData = new FormData();
      formData.append('resourceFile', data);
      return instance
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          ...config,
        })
        .then((res) => {
          // 接口统一报错处理
          if (res && res.status === 200 && res.data && res.data.success) {
            return res;
          }
          message.error(res?.data?.errorMsg || '请求失败');
          return res;
        });
    }

    // 一般接口直接注入参数
    let params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, data?.[key]?.toString() || '');
    });

    return instance.post(url, params, config).then((res) => {
      // 接口统一报错处理
      if (res && res.status === 200 && res.data && res.data.success) {
        return res;
      }
      message.error(res?.data?.errorMsg || '请求失败');
      return res;
    });
  },
  put(url, data, config) {
    return instance.put(url, data, config);
  },
  patch(url, data, config) {
    return instance.patch(url, data, config);
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config,
    });
  },
};

export default http;
