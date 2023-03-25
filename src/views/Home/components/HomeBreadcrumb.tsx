import React from "react";
import { Breadcrumb } from "antd";
import styles from "../Home.module.scss";
// 获取matchs
import { matchRoutes, useLocation } from "react-router-dom";
import { routes } from "../../../router";

export default function HomeBreadcrumb() {
  const location = useLocation();
  const matchs = matchRoutes(routes, location);

  return (
    /* Breadcrumb面包屑 */
    <Breadcrumb className={styles["home-breadcrumb"]}>
      {
        // 遍历路由输出
        matchs?.map((v) => (
          <Breadcrumb.Item key={v.pathnameBase}>
            {v.route.meta?.title}
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
}
