import { createHashRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import React from 'react';
// 懒加载的方式引入对应页面 配置suspense在index.tsx
import { lazy } from 'react';
// icons
import {
  CopyOutlined,
  CalendarOutlined,
  WarningOutlined,
  FileAddOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
// 使用lazy中的回调函数导入页面路径
const Home = lazy(() => import('../views/Home/Home'));
const Sign = lazy(() => import('../views/Sign/Sign'));
const Check = lazy(() => import('../views/Check/Check'));
const Login = lazy(() => import('../views/Login/Login'));
// 懒加载的形式引入
const BeforeEach = lazy(() => import('../components/BeforeEach/BeforeEach'));
// 扩展d.ts文件中 react-router 中RouteObject的（IndexRouteObject || NonIndexRouteObject）两个接口
declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      // icon?: React.ReactNode;
      // 优化特定类型
      icon?: React.ReactElement<AntdIconProps>;
      auth?: boolean;
    };
    name: string;
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      // icon?: React.ReactNode;
      // 优化特定类型
      icon?: React.ReactElement<AntdIconProps>;
      auth?: boolean;
    };
    name: string;
  }
}

// 定义路由表组及类型
export const routes: RouteObject[] = [
  {
    // 首页重定向到第一个二级路由
    path: '/',
    element: <Navigate to="/sign" />,
    name: '/',
  },
  {
    path: '/',
    element: (
      <BeforeEach>
        <Home />
      </BeforeEach>
    ),
    name: 'home',
    meta: {
      menu: true,
      title: '主页',
      // icon: React.createElement(CopyOutlined),
      icon: <CopyOutlined />,
      auth: true,
    },
    children: [
      {
        path: 'sign',
        element: <Sign />,
        meta: {
          menu: true,
          title: '标记',
          // icon: React.createElement(CalendarOutlined),
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'sign',
      },
      {
        path: 'check',
        element: <Check />,
        meta: {
          menu: true,
          title: '核实',
          // icon: React.createElement(ScheduleOutlined),
          icon: <ScheduleOutlined />,
          auth: true,
        },
        name: 'check',
      },
    ],
  },
  {
    path: '/login',
    // element: React.createElement(BeforeEach, null, React.createElement(Login)),
    element: (
      <BeforeEach>
        <Login />
      </BeforeEach>
    ),
    name: 'login',
  },
];
// 创建路由对象,createBrowserRouter(路由表)
// import { createHashRouter } from 'react-router-dom';
// const router = createBrowserRouter(routes);
// 使用 createHashRouter 函数来创建一个 HashRouter 路由器
const router = createHashRouter(routes);
export default router;
