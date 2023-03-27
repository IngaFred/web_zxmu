import React from 'react';
import styles from './index.module.scss';
// 引入拆分组件
import HomeHeader from './components/home-header';
import HomeAside from './components/home-aside';
import HomeBreadcrumb from './components/home-breadcrumb';
import HomeMain from './components/home-main';
// antd
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

// 首页（公告，主题分类，课程列表，我的作业，个人信息）
// 洪浩然，章徐松

export default function Home() {
  return (
    <Layout>
      <Header className="header">
        <HomeHeader />
      </Header>
      <Layout>
        <Sider width={240} theme={'light'}>
          <HomeAside />
        </Sider>
        <Layout style={{ padding: '20px' }}>
          <HomeBreadcrumb />
          <Content className={styles['home-main']}>
            <HomeMain />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
