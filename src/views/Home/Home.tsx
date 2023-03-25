import React from "react";
import styles from "./Home.module.scss";
// 进行二级路由测试<Outlet />
// import { Outlet } from "react-router-dom";
// import WelcomeIIIIrcc from "../../components/test/WelcomeIIIIrcc";
// 引入拆分组件
import HomeHeader from "./components/HomeHeader";
import HomeAside from "./components/HomeAside";
import HomeBreadcrumb from "./components/HomeBreadcrumb";
import HomeMain from "./components/HomeMain";
// antd
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;

export default function Home() {
  return (
    <Layout>
      <Header className="header">
        <HomeHeader />
      </Header>
      <Layout>
        <Sider width={240} theme={"light"}>
          <HomeAside />
        </Sider>
        <Layout style={{ padding: "20px" }}>
          <HomeBreadcrumb />
          <Content className={styles["home-main"]}>
            <HomeMain />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
