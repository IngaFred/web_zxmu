import { createHashRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import React from 'react';
// 懒加载的方式引入对应页面 配置suspense在index.tsx
import { lazy } from 'react';
// icons
import {
  CopyOutlined,
  CalendarOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

// 使用lazy中的回调函数导入页面路径
const Login = lazy(() => import('../views/login'));
const Page = lazy(() => import('../views/page'));
const Home = lazy(() => import('../views/home'));
const Personal = lazy(() => import('../views/personal'));
const Information = lazy(() => import('../views/information'));
// student端
const Course = lazy(() => import('../views/student/course'));
const Detail = lazy(() => import('../views/student/detail'));
const List = lazy(() => import('../views/student/list'));
const Show = lazy(() => import('../views/student/show'));

// teacher端
const CourseTeacher = lazy(() => import('../views/teacher/course'));
const DetailTeacher = lazy(() => import('../views/teacher/detail'));
const ListTeacher = lazy(() => import('../views/teacher/list'));
const ShowTeacher = lazy(() => import('../views/teacher/show'));
const NewTeacher = lazy(() => import('../views/teacher/new'));
const ScoringTeacher = lazy(() => import('../views/teacher/scoring'));


// 懒加载的形式引入
const BeforeEach = lazy(() => import('../components/before-each'));
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
      icon?: React.ReactElement<AntdIconProps>;
      auth?: boolean;
    };
    name: string;
  }
}
// 定义路由表组及类型
export const routes: RouteObject[] = [
    // 首页重定向到第一个二级路由
  {
    path: '/',
    element: <Navigate to="/home" />,
    name: '/',
  },
  {
    path: '/',
    element: (
      <BeforeEach>
        <Page />
      </BeforeEach>
    ),
    name: 'home',
    meta: {
      menu: true,
      title: '页面',
      icon: <CopyOutlined />,
      auth: true,
    },
    children: [
      // main
      {
        path: 'home',
        element: <Home />,
        meta: {
          menu: true,
          title: '主页',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'home',
      },
      {
        path: 'personal',
        element: <Personal />,
        meta: {
          menu: true,
          title: '个人',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'personal',
      },
      

      // student
      {
        path: 'course',
        element: <Course />,
        meta: {
          menu: true,
          title: '课程详情',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'course',
      },
      {
        path: 'list',
        element: <List />,
        meta: {
          menu: true,
          title: '作业列表',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'list',
      },
      {
        path: 'detail',
        element: <Detail />,
        meta: {
          menu: true,
          title: '作业详情',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'detail',
      },
      {
        path: 'show',
        element: <Show />,
        meta: {
          menu: true,
          title: '优秀成果展示',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'show',
      },

      // teacher

      // {
      //   path: 'courseTeacher',
      //   element: <CourseTeacher />,
      //   meta: {
      //     menu: true,
      //     title: '课程详情',
      //     icon: <CalendarOutlined />,
      //     auth: true,
      //   },
      //   name: 'courseTeacher',
      // },
      // {
      //   path: 'detailTeacher',
      //   element: <DetailTeacher />,
      //   meta: {
      //     menu: true,
      //     title: '作业详情设置',
      //     icon: <CalendarOutlined />,
      //     auth: true,
      //   },
      //   name: 'detailTeacher',
      // },
      // {
      //   path: 'listTeacher',
      //   element: <ListTeacher />,
      //   meta: {
      //     menu: true,
      //     title: '我的作业列表',
      //     icon: <CalendarOutlined />,
      //     auth: true,
      //   },
      //   name: 'listTeacher',
      // },{
      //   path: 'scoringTeacher',
      //   element: <ScoringTeacher />,
      //   meta: {
      //     menu: true,
      //     title: '作业详情打分',
      //     icon: <CalendarOutlined />,
      //     auth: true,
      //   },
      //   name: 'scoringTeacher',
      // },
      // {
      //   path: 'showTeacher',
      //   element: <ShowTeacher />,
      //   meta: {
      //     menu: true,
      //     title: '优秀成果展示',
      //     icon: <CalendarOutlined />,
      //     auth: true,
      //   },
      //   name: 'showTeacher',
      // },
      // {
      //   path: 'newTeacher',
      //   element: <NewTeacher />,
      //   meta: {
      //     menu: true,
      //     title: '新建/修改课程',
      //     icon: <CalendarOutlined />,
      //     auth: true,
      //   },
      //   name: 'newTeacher',
      // },
      {
        path: 'information',
        element: <Information />,
        meta: {
          menu: true,
          title: '教师团队信息',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'information',
      },
    ]
  },
  {
    path: '/login',
    element: (
      <BeforeEach>
        <Login />
      </BeforeEach>
    ),
    name: 'login',
  },
];
// 使用 createHashRouter 函数来创建一个 HashRouter 路由器
const router = createHashRouter(routes);
export default router;
