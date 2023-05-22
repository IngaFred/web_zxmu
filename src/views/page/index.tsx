import React from 'react';
import styles from './index.module.scss';
import HomeHeader from './components/page-header';
import HomeBreadcrumb from './components/page-breadcrumb';
import HomeMain from './components/page-main';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

export default function Page() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Layout style={{ height: '' }}>
      <Header className={styles.header}>
        <HomeHeader />
      </Header>
      <div style={{ height: '50px' }}></div>
      <Layout>
        <Layout style={{ padding: '10px', paddingBottom: '0' }}>
          {path !== '/home' && <HomeBreadcrumb />}
          <Content className={styles['home-main']}>
            <HomeMain />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
