// 引入react-router-dom件
import { createHashRouter, Navigate } from "react-router-dom";
// 引入路由类型
import type { RouteObject } from "react-router-dom";
// 引入React方法进行element的创建 React.createElement(页面模块)
import React from "react";
// 懒加载的方式引入对应页面 配置suspense在index.tsx
import { lazy } from "react";
// icons
import {
  CopyOutlined,
  CalendarOutlined,
  WarningOutlined,
  FileAddOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
// 使用lazy中的回调函数导入页面路径
const Home = lazy(() => import("../views/Home/Home"));
const Sign = lazy(() => import("../views/Sign/Sign"));
const Check = lazy(() => import("../views/Check/Check"));
const Login = lazy(() => import("../views/Login/Login"));
// import BeforeEach from "../components/BeforeEach/BeforeEach";
// 懒加载的形式引入
const BeforeEach = lazy(() => import("../components/BeforeEach/BeforeEach"));
// meta?: MetaHTMLAttributes
// import type { MetaHTMLAttributes } from 'react'
// 扩展d.ts文件中 react-router 中RouteObject的（IndexRouteObject || NonIndexRouteObject）两个接口
declare module "react-router" {
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
// export 输出个接口可以调用
export const routes: RouteObject[] = [
  {
    // 首页重定向到第一个二级路由
    path: "/",
    element: <Navigate to="/sign" />,
    name: "/",
  },
  // element: <Home /> ts中这种写法是错误的，在ts里会认为这是一个类型,但是tsx不会
  // 使用全局守卫形式(全局守卫,属性,子项) 套在一级路由下path: '/',
  {
    path: "/",
    element: (
      <BeforeEach>
        <Home />
      </BeforeEach>
    ),
    name: "home",
    meta: {
      menu: true,
      title: "主页",
      icon: React.createElement(CopyOutlined),
      // 权限认证
      auth: true,
    },
    children: [
      {
        path: "sign",
        element: <Sign />,
        // @ts-ignore  { createBrowserRouter } from 'react-router-dom' 没有拓展ts属性导致的ts类型错误 可忽略
        meta: {
          menu: true,
          title: "标记",
          icon: React.createElement(CalendarOutlined),
          auth: true,
        },
        name: "sign",
      },
      {
        path: "check",
        element: <Check />,
        meta: {
          menu: true,
          title: "核实",
          icon: React.createElement(ScheduleOutlined),
          auth: true,
        },
        name: "check",
      },
    ],
  },
  {
    path: "/login",
    element: React.createElement(BeforeEach, null, React.createElement(Login)),
    name: "login",
  },
];
// 创建路由对象,createBrowserRouter(路由表)
// import { createHashRouter } from 'react-router-dom';
// const router = createBrowserRouter(routes);
// 使用 createHashRouter 函数来创建一个 HashRouter 路由器
const router = createHashRouter(routes);
// 提供对外接口
export default router;
