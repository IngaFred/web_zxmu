import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import styles from "../Home.module.scss";
// 拿到infos
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
// 得到路由
import { routes } from "../../../router";
// 克隆过滤路由
import _ from "lodash";
import { useLocation, matchRoutes, Link } from "react-router-dom";

export default function HomeAside() {
  // 得到infos下的permission 可能为空
  // 现在已经获得了permission 要进行筛选
  // 不要直接对路由表操作，防止出现 互相引用的问题 使用lodash进行克隆 深拷贝 过滤
  const permission = useSelector(
    (state: RootState) => state.user.infos.permission
  ) as unknown[];
  const menus = _.cloneDeep(routes).filter((v) => {
    v.children = v.children?.filter((v) => {
      return permission.includes(v.name) && v.meta?.menu;
    });
    return permission.includes(v.name) && v.meta?.menu;
  });
  // 变成具备动态菜单渲染的路由menu 转圜成菜单栏
  const items: MenuProps["items"] = menus.map((v1) => {
    const children = v1.children?.map((v2) => {
      return {
        key: v1.path! + v2.path!,
        // 实现路由跳转 标签
        label: <Link to={v1.path! + v2.path!}> {v2.meta?.title} </Link>,
        icon: v2.meta?.icon,
      };
    });
    return {
      // 不能将类型 key: string | undefined; 进行非空断言
      key: v1.path!,
      label: v1.meta?.title,
      icon: v1.meta?.icon,
      children,
    };
  });
  // 获取路径 存在matchs中
  const location = useLocation();
  const matchs = matchRoutes(routes, location);
  // console.log(matchs)
  // 非空判定 !.
  const subpath = matchs![0].pathnameBase || "";
  const path = matchs![1].pathnameBase || "";

  return (
    <>
      <Menu
        // path
        // 去default，使得它可以自适应路由的变化
        selectedKeys={[path]}
        // subpath
        openKeys={[subpath]}
        mode="inline"
        items={items}
        className={styles["home-aside"]}
      />
    </>
  );
}
