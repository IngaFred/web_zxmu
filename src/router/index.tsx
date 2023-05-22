import { createHashRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import React from 'react';
// 懒加载的方式引入对应页面 配置suspense在index.tsx
import { lazy } from 'react';
// icons
import { CopyOutlined, CalendarOutlined } from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

// 使用lazy中的回调函数导入页面路径
const Login = lazy(() => import('../views/login'));
const Page = lazy(() => import('../views/page'));
const Home = lazy(() => import('../views/home'));
const Personal = lazy(() => import('../views/personal'));
const Information = lazy(() => import('../views/information'));
const Gonggao = lazy(() => import('../views/gonggao'));
// student端
const Course = lazy(() => import('../views/student/course'));
const Detail = lazy(() => import('../views/student/detail'));
const List = lazy(() => import('../views/student/list'));
const Show = lazy(() => import('../views/student/show'));
const ShowDetail = lazy(() => import('../views/student/showDetails'));

// teacher端
const DetailTeacher = lazy(() => import('../views/teacher/detail'));
const CourseTeacher = lazy(() => import('../views/teacher/course'));
const DetailListTeacher = lazy(() => import('../views/teacher/detailList'));
const ShowTeacher = lazy(() => import('../views/teacher/show'));
const ScoringTeacher = lazy(() => import('../views/teacher/scoring'));
const LessonListTeacher = lazy(() => import('../views/teacher/courseList'));
const UpdateLesson = lazy(() => import('../views/teacher/update'));

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
      propRouter?: ItemType[];
    };
    name: string;
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean;
      title?: string;
      icon?: React.ReactElement<AntdIconProps>;
      auth?: boolean;
      propRouter?: ItemType[];
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
    path: '/login',
    element: (
      <BeforeEach>
        <Login />
      </BeforeEach>
    ),
    name: 'login',
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
      title: '返回主页',
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
      {
        path: 'gonggao',
        element: <Gonggao />,
        meta: {
          menu: true,
          title: '课程大纲',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'gonggao',
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
          propRouter: [
            {
              key: 'list',
              title: '作业列表',
            },
          ],
        },
        name: 'detail',
      },
      {
        path: 'show',
        element: <Show />,
        meta: {
          menu: true,
          title: '优秀作业列表',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'list',
              title: '作业列表',
            },
            {
              key: 'detail',
              title: '作业详情',
            },
          ],
        },
        name: 'show',
      },
      {
        path: 'showDetail',
        element: <ShowDetail />,
        meta: {
          menu: true,
          title: '优秀作业详情',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'list',
              title: '作业列表',
            },
            {
              key: 'detail',
              title: '作业详情',
            },
            {
              key: 'show',
              title: '优秀作业列表',
            },
          ],
        },
        name: 'showDetail',
      },
      // teacher
      {
        path: 'courseList',
        element: <LessonListTeacher />,
        meta: {
          menu: true,
          title: '我的教学课程',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'courseList',
      },
      {
        path: 'courseTeacher',
        element: <CourseTeacher />,
        meta: {
          menu: true,
          title: '课程详情',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'courseList',
              title: '我的教学课程',
            },
          ],
        },
        name: 'courseTeacher',
      },
      {
        path: 'updateLesson',
        element: <UpdateLesson />,
        meta: {
          menu: true,
          title: '修改课程',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'courseList',
              title: '我的教学课程',
            },
            {
              key: 'courseTeacher',
              title: '课程详情',
            },
          ],
        },
        name: 'courseTeacher',
      },
      {
        path: 'createLesson',
        element: <UpdateLesson />,
        meta: {
          menu: true,
          title: '新建课程',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'courseList',
              title: '我的教学课程',
            },
          ],
        },
        name: 'courseTeacher',
      },
      {
        path: 'detailTeacher',
        element: <DetailTeacher />,
        meta: {
          menu: true,
          title: '新建作业',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'courseList',
              title: '我的课程',
            },
            {
              key: 'courseTeacher',
              title: '课程详情',
            },
            {
              key: 'updateLesson',
              title: '修改课程',
            },
          ],
        },
        name: 'detailTeacher',
      },
      {
        path: 'detailListTeacher',
        element: <DetailListTeacher />,
        meta: {
          menu: true,
          title: '批改作业列表',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'courseList',
              title: '我的课程',
            },
            {
              key: 'courseTeacher',
              title: '课程详情',
            },
          ],
        },
        name: 'detailListTeacher',
      },
      {
        path: 'scoringTeacher',
        element: <ScoringTeacher />,
        meta: {
          menu: true,
          title: '作业详情打分',
          icon: <CalendarOutlined />,
          auth: true,
          propRouter: [
            {
              key: 'courseList',
              title: '我的课程',
            },
            {
              key: 'courseTeacher',
              title: '课程详情',
            },
            {
              key: 'detailListTeacher',
              title: '批改作业列表',
            },
          ],
        },
        name: 'scoringTeacher',
      },
      {
        path: 'showTeacher',
        element: <ShowTeacher />,
        meta: {
          menu: true,
          title: '优秀作业列表',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'showTeacher',
      },
      {
        path: 'information',
        element: <Information />,
        meta: {
          menu: true,
          title: '教师团队',
          icon: <CalendarOutlined />,
          auth: true,
        },
        name: 'information',
      },
    ],
  },
];
// 使用 createHashRouter 函数来创建一个 HashRouter 路由器
const router = createHashRouter(routes);
export default router;
