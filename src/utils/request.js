import axios from 'axios';
import router from '../router'
// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://localhost:8081', // 请求的基础URL
  timeout: 100000 // 请求超时时间
});

// 请求拦截器
// service.interceptors.request.use(
//   config => {
//     let accessToken = localStorage.getItem('token');
//     if (accessToken) {
//       config.headers = Object.assign({
//         Authorization: `${accessToken}`
//       }, config.headers);
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (localStorage.getItem('token')) {
      config.headers['Token'] = localStorage.getItem('token'); // 让每个请求携带自定义token
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.log(error); // for debug
    Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
  response => {
    // 处理响应数据
    // console.log(response.data)
    return response.data;
  },
  error => {
    // 处理响应错误
    if (error.response.status === 401) {
      // 收到401未授权错误，重定向到登录页面
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default service;