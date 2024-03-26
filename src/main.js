import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vuetyped from 'vue3typed'
import naive from 'naive-ui'
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
app.use(naive).use(vuetyped).use(ElementPlus).use(store).use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')

