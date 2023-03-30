import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button, Modal, Divider, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import LocalizedModal from "./modal";
import { getUserInfo } from "../../service/personal";
// 个人信息（设置密码）
// 蔡启航

export default function Personal() {
  // 得到学生信息
  const student = useSelector((state: RootState) => state.user.infos);
  console.log(student);

  const [modal, contextHolder] = Modal.useModal();
  /* const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "确认",
      cancelText: "取消",
    });
  }; */

  return (
    <>
      <h1>个人信息</h1>
      <Divider />
      <div className={styles.introduce}>
        <img
          src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF"
          className={styles.icons_items}
          alt="头像"
        />
        <button className={styles.fixtx} /* onClick={()=> }  */>
          {"修改头像"}
        </button>
      </div>

      <div className={styles.shuchu}>学号：{111}</div>
      <div className={styles.shuchu}>姓名；{"我"}</div>

      <Space>
        <LocalizedModal />
        {/* <Button onClick={confirm}>Confirm</Button> */}
      </Space>
      {contextHolder}
    </>
  );
}
