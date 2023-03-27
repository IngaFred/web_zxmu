import React from "react";
import { Breadcrumb } from "antd";
import styles from "../index.module.scss";
// 获取matches
import { matchRoutes, useLocation } from "react-router-dom";
import { routes } from "../../../router";

export default function HomeBreadcrumb() {
  const location = useLocation();
  const matches = matchRoutes(routes, location);
  // items内部值是key+title
  const items = (matches ?? []).map((v) => ({
    key: v.pathnameBase,
    title: v.route.meta?.title
  }));
  return (
    /* Breadcrumb面包屑 */
    <Breadcrumb className={styles["home-breadcrumb"]} items={items} />
  );
}
