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
