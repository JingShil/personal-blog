import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/layout/Index.vue'),
    children:[
      {
        path: '/',
        name: '首页',
        component: ()=>import('../views/home/Index.vue'),
      },
      {
        path: '/blog',
        name: '博文',
        component: ()=>import('../views/blog/Index.vue'),
      },
      {
        path: '/edit',
        name: '编辑',
        component: ()=>import('../views/edit/Index.vue'),
      },
      {
        path: '/user',
        name: '用户',
        component: ()=>import('../views/user/Index.vue'),
      },
      {
        path: '/controller',
        name: '控制台',
        component: ()=>import('../views/controller/Index.vue'),
      },
     
    ]
  },
  {
    path: '/login',
    name: '登陆',
    component: ()=>import('../views/login/Index.vue'),
  },
  {
    path: '/test',
    name: '测试',
    component: ()=>import('../views/test/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
