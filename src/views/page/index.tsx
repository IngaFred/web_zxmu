import React from 'react';
import styles from './index.module.scss';
// 引入拆分组件
import HomeHeader from './components/page-header';
import HomeAside from './components/page-aside';
import HomeBreadcrumb from './components/page-breadcrumb';
import HomeMain from './components/page-main';
// antd
import { Layout } from 'antd';
import { Footer } from 'antd/es/layout/layout';
const { Header, Content, Sider } = Layout;

export default function Page() {
	return (
		<Layout style={{ height: '' }}>
			<Header className="header">
				<HomeHeader />
			</Header>
			<Layout>
				<Sider width={220} theme={'light'} style={{ display: 'none' }}>
					<HomeAside />
				</Sider>
				<Layout style={{ padding: '10px', paddingBottom: '0' }}>
					<HomeBreadcrumb />
					<Content className={styles['home-main']}>
						<HomeMain />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
