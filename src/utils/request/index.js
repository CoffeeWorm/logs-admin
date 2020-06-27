import axios from 'axios';
import { message } from 'antd';
import { generatePath } from 'react-router-dom';

const { token } = localStorage;
const request = axios.create();

request.interceptors.request.use(
  (config) => {
    /* eslint-disable */
    config.match && (config.url = generatePath(config.url, config.match));
    token && (config.headers['x-auth-token'] = token || localStorage.token);
    /* eslint-enable */
    return config;
  },
  (error) => {
    message.error('请求出错了！');
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  ({ data }) => {
    const { code } = data;
    if (code === 404) {
      message.error('404 not found!');
      return Promise.reject(new Error('404 not found'));
    }
    return data;
  },
  (error) => {
    message.error('请求出错了！');
    return Promise.reject(error);
  }
);

export default request;
