import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vuetyped from 'vue3typed'

const app = createApp(App)

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
  
//   if (to.path !== '/login' && !token) {
//     // 如果路由不是登录页面且localStorage中没有token，则跳转到登录页面
//     next('/login');
//   } else {
//     // 如果存在token或者是登录页面，则继续路由跳转
//     next();
//   }
// });
app.use(ElementPlus)
app.use(vuetyped).use(store).use(router)
const globalImgDownload = 'http://43.129.171.44:8081/img/download?fileName='
app.provide('globalImgDownload',globalImgDownload)
app.config.globalProperties.$globalImgDownload = globalImgDownload;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')

