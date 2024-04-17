import axios from 'axios';
import router from '../router'
import { ElMessage, ElMessageBox } from 'element-plus'
// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://43.129.171.44:8081', // 请求的基础URL
  timeout: 10000 // 请求超时时间
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
    }else{
      return config;
    }
    if(localStorage.getItem('userInfo')){
      config.headers['UserId'] = JSON.parse(localStorage.getItem('userInfo')).id;
    }
    
    return config;
  },
  error => {
    // 对请求错误做些什么

    Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
 
  response => {
    // 处理响应数据
    console.log(response.data)
    return response.data;
  },
  error => {
    // ElMessageBox.alert('网络错误，请重新登陆', '', {
    //   // if you want to disable its autofocus
    //   // autofocus: false,
    //   confirmButtonText: '确认',
    //   callback: (action) => {
    //     router.push('/login');
    //   },
    // })
    // 处理响应错误
    // console.log(error)
    // if (error.response && error.response.status === 401) {
    //   // 收到401未授权错误，重定向到登录页面
    //   router.push('/login');
    // }
    return Promise.reject(error);
  }
);

export default service;