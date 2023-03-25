import React from "react";
import classNames from "classnames";
import styles from "../Home.module.scss";
import { Dropdown, Badge, Space, Avatar } from "antd";
import type { MenuProps } from "antd";
import { BellOutlined } from "@ant-design/icons";
// infos
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
// token操作+同步方法
import { useAppDispatch } from "../../../store";
import { clearToken } from "../../../store/modules/user";
// 

export default function HomeHeader() {
  // infos,获取用户name,head
  const name = useSelector(
    (state: RootState) => state.user.infos.name
  ) as string;
  const head = useSelector(
    (state: RootState) => state.user.infos.head
  ) as string;
  const dispatch = useAppDispatch();

  const headleLogout = () => {
    // 清除token
    dispatch(clearToken())
    // 延时返回
    setTimeout(
      () => {
        // window.location.replace('/login')
        window.location.replace('/')
      }
    )
  }
  const items1: MenuProps["items"] = [
    {
      key: "1",
      label: <div>信息提示</div>,
    },
  ];
  const items2: MenuProps["items"] = [
    {
      key: "1",
      label: <div>个人中心</div>,
    },
    {
      key: "2",
      // 实现退出 清除token 到login
      label: <div onClick={headleLogout}>退出</div>,
    },
  ];

  return (
    <div className={styles["home-header"]}>
      {/* logo */}
      <span className={styles["home-header-logo"]}>
        <i
          className={classNames("iconfont icon-react", styles["icon-react"])}
        ></i>
        <i
          className={classNames(
            "iconfont icon-icon-test",
            styles["icon-icon-test"]
          )}
        ></i>
        <i
          className={classNames(
            "iconfont icon-typescript",
            styles["icon-typescript"]
          )}
        ></i>
      </span>
      {/* name */}
      <span className={styles["home-header-title"]}>在线系统</span>
      {/* Dropdown下拉菜单1 Bell */}
      <Dropdown menu={{ items: items1 }} arrow placement="bottom">
        {/* Badge 徽标数 */}
        <Badge dot>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
      </Dropdown>
      {/* Dropdown下拉菜单2  Avatar头像*/}
      <Dropdown menu={{ items: items2 }} arrow placement="bottom">
        {/* space 间距包住 */}
        <Space className={styles["home-header-space"]}>
          {/* Avatar头像 */}
          <Avatar size="large" src={head} /> {name}
        </Space>
      </Dropdown>
    </div>
  );
}
