import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  initialState: {},
  model: {},
  dva: {},
  request: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      // target: 'https://travel.shenzhiyong.com.cn',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    }
  },
  layout: {
    title: '@umijs/max',
  },

  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: '房间',
      path: '/house',
      // component: './House/Add',
      routes: [
        {
          name: '房间列表',
          path: '/house/list',
          component: './House/List',
        },
        {
          name: '新增房间',
          path: '/house/add',
          component: './House/Add',
        },
        {
          name: '更新房间',
          hideInMenu: true,
          path: '/house/update/:id',
          component: './House/Add',
        }
      ]
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

